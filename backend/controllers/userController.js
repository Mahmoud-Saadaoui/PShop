import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import VerificationToken from "../models/verificationToken.js";
import generateToken from "../utils/generateToken.js";
import { validateRequiredFields } from "../utils/helpers.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";
import { verificationEmailTemplate } from "../utils/templates.js";
import gravatar from "gravatar"

/**
 * @desc   Login user
 * @route  POST /api/users/login
 * @access Public
*/
export const authUser = asyncHandler(async (req, res) => {
  // Validate required fields
  const requiredFields = ["email", "password"];
  const validation = validateRequiredFields(req.body, requiredFields)
  if (validation) {
    return res.status(400).json({ message: validation });
  }
  // Find the user by email
  const user = await User.findOne({ email: req.body.email });
  // Check if user exists and if the password is correct
  if (!user || !(await user.matchPassword(req.body.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  } 
  // Check if the account is verified
  if(!user.isAccountVerified){
    let verificationToken = await VerificationToken.findOne({
      userId: user._id,
    });
    // Generate a new verification token if one doesn't already exist
    if (!verificationToken) {
      verificationToken = new VerificationToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
      await verificationToken.save();
    }
    // Prepare email content with verification link
    // const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`;
    const link = `http://localhost:5000/api/users/${verificationToken.userId}/verify/${verificationToken.token}`
    const htmlTemplate = verificationEmailTemplate(link);
    // Send verification email
    await sendEmail(user.email, "Verify Your Email", htmlTemplate);
    return res.status(403).json({
      message:
        "Your account is not verified. A new verification email has been sent. Please check your inbox.",
    });
  }
  // Generate JWT token and send response
  const token = generateToken(res, user._id);
  res.status(200).json({
    token,
    _id: user._id,
    name: user.name,
    isAdmin: user.isAdmin,
  });
});

/**
 * @desc   Register user
 * @route  POST /api/users/register
 * @access Public
*/
export const registerUser = asyncHandler(async (req, res) => {
  // Validate required fields
  const requiredFields = ["name", "email", "password"];
  const validation = validateRequiredFields(req.body, requiredFields)
  if (validation) {
    return res.status(400).json({ message: validation });
  }
  // Check if the user already exists
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(400).json({ message: "User Already Exist" });
  }
  // Generate an avatar via gravatar
  const avatar = gravatar.url(req.body.email, {
    s: "200", 
    r: "pg",  
    d: "mm",  
  });
  // Create a new user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    avatar,
    password: req.body.password
  });
  await user.save()
  // Generate a unique verification token
  const verificationToken = new VerificationToken({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  })
  await verificationToken.save()
  // Prepare email content with verification link
  // const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`;
  const link = `http://localhost:5000/api/users/${verificationToken.userId}/verify/${verificationToken.token}`
  const htmlTemplate = verificationEmailTemplate(link);
  // Send verification email
  await sendEmail(user.email, "Verify Your Email", htmlTemplate);

  res.status(201).json({
    message: "We sent to you an email, please verify your email address",
  });
});

/**
 *  @desc    Verify Account
 *  @route   GET /api/users/:userId/verify/:token
 *  @access  public
*/
export const verifyAccount = asyncHandler(async(req, res) => {
  const { userId, token } = req.params
  // Check if user exist
  const user = await User.findById(userId)
  if (!user) {
    return res.status(400).json({ message: "Invalid Verification Link" })
  }

  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: token,
  })
  if (!verificationToken) {
    return res.status(400).json({ message: "Invalid Link" });
  }
  user.isAccountVerified = true
  await user.save()

  await VerificationToken.deleteOne({ _id: verificationToken._id });

  res.status(200).json({ message: "Your Account is Verified!" })
})

/**
 * @desc   Logout user | clear cookies
 * @route  POST /api/users/logout
 * @access Public
*/
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

/**
 * desc   Get User profile
 * route  GET /api/users/profile
 * access Private
*/
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user._id);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400).json({ message: "User Not Found" });
  }
});

/**
 * desc   Update User profile
 * route  PUT /api/users/profile
 * access Private
 */
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/**
 * desc   Get all users
 * route  GET /api/users
 * access Private|admin
*/
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

/**
 * desc   Get User by ID
 * route  GET /api/users/:id
 * access Private|admin
*/
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

/**
 * desc   Delete user
 * route  DELETE /api/users/:id
 * access Private|admin
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400).json({ message: "Can not delete admin user" });
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

/**
 * desc   Update User Role (admin)
 * route  PUT /api/users/:id
 * access Private|admin
*/
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

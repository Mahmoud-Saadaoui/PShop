import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

/**
 * desc   Auth user & get token
 * route  POST /api/users/login
 * access Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

/**
 * desc   Register user
 * route  POST /api/users
 * access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400).json({ message: 'User Already Exist' })
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    generateToken(res, user._id)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(400).json({ message: "Invalid User Data" })
  }
});

/**
 * desc   Logout user | clear cookies
 * route  POST /api/users/logout
 * access Public
 */
const logoutUser = asyncHandler(async (req, res) => {
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
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne( req.user._id )

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(400).json({ message: "User Not Found" })
  }
});

/**
 * desc   Update User profile
 * route  PUT /api/users/profile
 * access Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updateUser = await user.save()

    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin
    })
  } else {
    res.status(400).json({ message: "User Not Found" })
  }
});

/**
 * desc   Get Users profile
 * route  GET /api/users
 * access Private|admin
 */
const getUsers = asyncHandler(async (req, res) => {
  res.send("get all users profile");
});

/**
 * desc   Get User by ID
 * route  GET /api/users/:id
 * access Private|admin
 */
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

/**
 * desc   Delete user
 * route  DELETE /api/users/:id
 * access Private|admin
 */
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user profile");
});

/**
 * desc   Update User
 * route  PUT /api/users/:id
 * access Private|admin
 */
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserById,
  getUserProfile,
  getUsers,
  updateUser,
  updateUserProfile,
  deleteUser,
};

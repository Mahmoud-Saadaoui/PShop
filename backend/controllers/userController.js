import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";

/**
 * desc   Auth user & get token
 * route  POST /api/users/login
 * access Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    //  Set JWT as http-only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30days
    });

    res.json({
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
  res.send("register user");
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
  res.send("get user profile");
});

/**
 * desc   Update User profile
 * route  PUT /api/users/profile
 * access Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
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

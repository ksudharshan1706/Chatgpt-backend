const userModel = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");

//JWT Token
exports.sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken(res);
  console.log("authcontroller line7 :", token);
  res.status(statusCode).json({
    success: true,
    token: token,
  });
};
exports.registerController = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, email, password } = req.body;
    //check if it is a existing user
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      return next(new errorResponse("Email is already registered", 500));
    }
    const user = await userModel.create({ username, email, password });
    this.sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Login
exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new errorResponse("send credentials"));
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new errorResponse("User Not Registered"), 401);
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new errorResponse("Invalid Credentials"), 401);
    }
    this.sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Logout
exports.logoutController = async (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Logout Successfull",
  });
};

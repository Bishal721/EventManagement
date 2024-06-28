const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { getUsers } = require("../utils/userDataRead");

const Protected = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not Authorized, Please Login");
    }
    // verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // getting user id from token
    const users = getUsers();
    const user = users.find((usr) => usr._id === verified.id);

    // check if user exists
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    if (user.role === "suspended") {
      res.status(400);
      throw new Error("User suspended, please contact support");
    }
    // Remove password from user object
    const { password, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not Authorized, Please login");
  }
});

const adminOnly = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
});

module.exports = { Protected, adminOnly };

const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  loginStatus,
  getUser,
  updateUser,
  changePassword,
} = require("../controller/userController");
const { Protected } = require("../middleware/authMiddleware");
const router = express.Router();

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/loggedin", loginStatus);
router.get("/getuser", Protected, getUser);
router.patch("/updateuser", Protected, updateUser);
router.patch("/changepassword", Protected, changePassword);

module.exports = router;

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const { getUsers } = require("../utils/userDataRead");
const { writeFile } = require("fs").promises;
const path = require("path");

const generatetoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password should be atleast 6 characters");
  }

  // Convert email to lowercase
  const lowercaseEmail = email.toLowerCase();

  const users = getUsers();
  const userExists = users.find((user) => user.email === lowercaseEmail);

  if (userExists) {
    res.status(400);
    throw new Error("Email Has already been registered");
  }

  // Encrypt the password
  const salt = await bycrypt.genSalt(10);
  const hashedPassword = await bycrypt.hash(password, salt);

  // get current time
  const currenttime = new Date().getTime().toString();

  const token = generatetoken(currenttime);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // expires in 1 day
    secure: true,
    sameSite: "none",
  });

  const image = "https://i.ibb.co/4pDNDk1/avatar.png";

  const newUser = {
    _id: currenttime,
    name,
    email: lowercaseEmail,
    password: hashedPassword,
    role: "user",
    token,
    image,
  };
  // push new user to array
  users.push(newUser);
  const { _id, role } = newUser;

  try {
    await writeFile(
      path.join(`${__dirname}/../data/users.json`),
      JSON.stringify(users, null, 2)
    );
    res.status(201).json({ _id, name, email, role, token, image });
  } catch (error) {
    console.error("Error Saving users to file:", error);
    res.status(500).send("Internal Server Error");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const users = getUsers();
  const user = users.find((user) => user.email === email);

  if (!user) {
    res.status(400);
    throw new Error("User not found. Please Register first");
  }

  const correctPassword = await bycrypt.compare(password, user.password);

  const token = generatetoken(user._id);
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // expires in 1 day
    secure: true,
    sameSite: "none",
  });

  if (user && correctPassword) {
    const { _id, email, name, role, image } = user;
    res.status(200).json({ _id, email, name, role, token, image });
  } else {
    res.status(400);
    throw new Error("Invalid Email or password");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // expires in 1 day
    secure: true,
    sameSite: "none",
  });
  return res.status(200).json({ message: "Successfully Logged  Out" });
});

const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (verified) {
    return res.json(true);
  } else {
    return res.json(false);
  }
});

const getUser = asyncHandler(async (req, res) => {
  const user = req.user;
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  //validation
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  const users = getUsers();
  const userIndex = users.findIndex((usr) => usr._id === req.user._id);

  if (userIndex === -1) {
    res.status(404);
    throw new Error("User not found");
  }

  // Update user details
  users[userIndex].name = req.body.name || users[userIndex].name;
  users[userIndex].image = req.body.image || users[userIndex].image;

  // Save updated users array to JSON file
  try {
    await writeFile(
      path.join(`${__dirname}/../data/users.json`),
      JSON.stringify(users, null, 2)
    );

    const { _id, name, email, token, role, image } = users[userIndex];
    res.status(200).json({
      _id,
      name,
      email,
      role,
      token,
      image,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Failed to save user data");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const users = getUsers();
  const userIndex = users.findIndex((usr) => usr._id === req.user._id);

  if (userIndex === -1) {
    res.status(404);
    throw new Error("User not found");
  }
  const { newPassword, oldPassword } = req.body;
  if (!newPassword || !oldPassword) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  if (newPassword.length < 6) {
    res.status(400);
    throw new Error("Password should be atleast 6 characters");
  }

  const correctPassword = await bycrypt.compare(
    oldPassword,
    users[userIndex].password
  );

  if (!correctPassword) {
    res.status(400);
    throw new Error("Old password is incorrect");
  }

  const isSamePassword = await bycrypt.compare(
    newPassword,
    users[userIndex].password
  );

  if (isSamePassword) {
    res.status(400);
    throw new Error("New password cannot be the same as the old password");
  }

  // Encrypt the password
  const salt = await bycrypt.genSalt(10);
  const hashedPassword = await bycrypt.hash(newPassword, salt);

  users[userIndex].password = hashedPassword;
  // Update user Password
  await writeFile(
    path.join(`${__dirname}/../data/users.json`),
    JSON.stringify(users, null, 2)
  );
  res.status(200).json({ message: "Password updated successfully" });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  loginStatus,
  getUser,
  updateUser,
  changePassword,
};

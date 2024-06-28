const fs = require("fs");
const path = require("path");
let users;
function loadUsers() {
  try {
    const userData = fs.readFileSync(
      path.join(`${__dirname}/../data/users.json`)
    );
    users = JSON.parse(userData);
  } catch (error) {
    console.error("Error reading users data:", error.message);
    users = [];
  }
}

function getUsers() {
  return users;
}

module.exports = {
  loadUsers,
  getUsers,
};

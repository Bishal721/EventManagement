import axios from "axios";
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Register User
const registerUser = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/api/v1/users/register`,
    userData,
    { withCredentials: true }
  );
  return response.data;
};
// Login User
const loginUser = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/api/v1/users/login`,
    userData
  );
  return response.data;
};
// Logout User
const logoutUser = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/v1/users/logout`);
  return response.data.message;
};
//Get Login Status
const GetLoginStatus = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/v1/users/loggedin`);
  return response.data;
};

//Get User Data
const GetUser = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/v1/users/getuser`);
  return response.data;
};

//Update Profile
const updateUser = async (formData) => {
  const response = await axios.patch(
    `${BACKEND_URL}/api/v1/users/updateuser`,
    formData
  );
  return response.data;
};
const authService = {
  registerUser,
  loginUser,
  logoutUser,
  GetLoginStatus,
  GetUser,
  updateUser,
};

export default authService;

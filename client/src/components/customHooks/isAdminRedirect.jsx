import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../../redux/features/auth/authService";

const isAdminRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let isLoggedIn;
    let user;
    const redirectLoggedOutUser = async () => {
      try {
        isLoggedIn = await authService.GetLoginStatus();
        if (!isLoggedIn) {
          toast.info("Session expired, please login to continue");
          navigate("/login");
          return;
        }
        user = await authService.GetUser();
        if (user.role !== "admin") {
          toast.info("Unauthorized User");
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    redirectLoggedOutUser();
  }, [navigate]);
};

export default isAdminRedirect;

import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/features/auth/authSlice";

export const ShowOnLogin = ({ children }) => {
  const isLoggedin = useSelector(selectIsLoggedIn);
  if (isLoggedin) {
    return <>{children}</>;
  }
  return null;
};
export const ShowOnLogOut = ({ children }) => {
  const isLoggedin = useSelector(selectIsLoggedIn);

  if (!isLoggedin) {
    return <>{children}</>;
  }
  return null;
};

export const AdminLink = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  if (isLoggedIn && user?.role === "admin") {
    return <>{children}</>;
  }
  return null;
};

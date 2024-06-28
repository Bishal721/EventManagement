import { BiLogIn } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import loginimg from "../../assets/logimage.png";
import { RESET, loginUser } from "../../redux/features/auth/authSlice";
import { validateEmail } from "../../redux/features/auth/authService";
import Loader from "../../components/loader/Loader";
const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setformData] = useState(initialState);
  const { email, password } = formData;
  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const { isLoading, isLoggedIn, isSuccess, message, isError } = useSelector(
    (state) => state.auth
  );

  const login = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("All Fields are required");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least six characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    const userData = {
      email,
      password,
    };
    await dispatch(loginUser(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }

    if (isError) {
      console.log(message);
      navigate(`/login`);
    }
  }, [isLoggedIn, isSuccess, navigate, isError, email]);
  return (
    <div className="h-screen ">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center h-[40rem] mt-9">
        <div className="w-1/1 h-2/3  hidden lg:block bg-white shadow-md">
          <img
            src={loginimg}
            alt="Placeholder Image"
            className="object-cover w-full h-full rounded"
          />
        </div>
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 ">
          <div className="flex items-center  mb-4 text-orange-400">
            <BiLogIn size={33} />
            <h1 className="text-3xl font-semibold">&nbsp;Sign In</h1>
          </div>
          <form onSubmit={login}>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-md py-2 px-3 :outline-none focus:border-orange-50focus0"
                required
                value={email}
                onChange={HandleInputChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-500"
                required
                value={password}
                onChange={HandleInputChange}
              />
            </div>

            <button
              type="submit"
              className="bg-black/70 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Login
            </button>
          </form>
          <span className="mt-6 text-orange-400 text-center flex items-center justify-between">
            <p className="text-gray-500">
              &nbsp; Don't have an account? &nbsp;
            </p>
            <Link to="/register" className="hover:underline">
              Sign up Here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;

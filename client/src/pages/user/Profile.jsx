import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUser, updateUser } from "../../redux/features/auth/authSlice";
import useRedirectLoggedOutUser from "../../components/customHooks/useRedirectLoggedOutUser";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );
  useRedirectLoggedOutUser("/login");
  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
    image: user?.image || "",
  };
  const [profile, setProfile] = useState(initialState);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name: profile.name,
        email: profile.email,
        role: profile.role,
        image: profile.image,
      };
      const data = await dispatch(updateUser(formData));
      if (data.meta.requestStatus) {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useLayoutEffect(() => {
    if (user) {
      setProfile({
        ...profile,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      });
    }
  }, [user]);
  return (
    <>
      {isLoading && <Loader />}
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <img
              className="w-32 h-32 rounded-full object-cover mb-6"
              src={profile.image}
              alt={`${profile.name}'s profile`}
            />
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              Profile
            </h1>
          </div>
          <form className="space-y-4" onSubmit={updateProfile}>
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={profile?.name}
                onChange={HandleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={profile?.email}
                disabled={true}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-gray-700">Role</label>
              <input
                type="text"
                name="role"
                value={profile?.role}
                disabled={true}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-gray-700">Image URL</label>
              <input
                type="text"
                name="image"
                value={profile?.image}
                onChange={HandleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-orange-400 text-white rounded-lg hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/home/Home";
import HomeLayout from "./components/layout/HomeLayout";
import Layout from "./components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from "./redux/features/auth/authSlice";
import { useEffect } from "react";
import Events from "./pages/events/Events";
import EventDetail from "./pages/events/EventDetail";
import Profile from "./pages/user/Profile";
import CreateEvent from "./pages/events/CreateEvent";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminLayout from "./components/layout/AdminLayout";
import UpdateEvent from "./pages/events/UpdateEvent";
import ErrorPage from "./pages/error/ErrorPage";
axios.defaults.withCredentials = true;
function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  useEffect(() => {
    async function fetch() {
      await dispatch(getLoginStatus());
      if (isLoggedIn && user === null) {
        dispatch(getUser());
      }
    }
    fetch();
  }, [isLoggedIn, user, dispatch, fetch]);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <HomeLayout>
              <Home />
            </HomeLayout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />

        <Route
          path="/events"
          element={
            <Layout>
              <Events />
            </Layout>
          }
        />
        <Route
          path="/event-details/:id"
          element={
            <Layout>
              <EventDetail />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="createEvent" element={<CreateEvent />} />
          <Route path="updateEvent/:id" element={<UpdateEvent />} />
        </Route>
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

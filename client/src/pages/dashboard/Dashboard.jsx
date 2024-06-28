import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../redux/features/events/eventSlice";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import EventList from "../events/EventList";

const Dashboard = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { events, isLoading, isError, message } = useSelector(
    (state) => state.event
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getEvents());
    }
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);
  return (
    <div>
      <EventList events={events} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../redux/features/events/eventSlice";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";
export const shortenText = (text, n) => {
  if (text.length > n) {
    const shortenedText = text.substring(0, n).concat("...");
    return shortenedText;
  }
  return text;
};
import Search from "../../components/search/Search";
import {
  FILTER_EVENTS,
  selectFilteredEvents,
} from "../../redux/features/filter/filterSlice";
const Events = () => {
  const [search, setSearch] = useState("");
  const handleSearchChange = (value) => {
    setSearch(value);
  };
  const dispatch = useDispatch();
  const { events, isLoading, isError, message } = useSelector(
    (state) => state.event
  );
  const filteredEvents = useSelector(selectFilteredEvents);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    setCurrentItems(filteredEvents);
  }, [filteredEvents]);
  useEffect(() => {
    dispatch(getEvents());
    if (isError) {
      console.log(message);
    }
  }, [dispatch, isError, message]);
  useEffect(() => {
    dispatch(FILTER_EVENTS({ events, search }));
  }, [events, search, dispatch]);
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && events.length === 0 ? (
        <div className="flex justify-center items-center">
          <div className="text-2xl text-red-500">Events Not Available</div>
        </div>
      ) : (
        <>
          <div>
            <Search value={search} onChange={handleSearchChange} />
          </div>
          <div className="grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 gap-6 p-4 mx-auto sm:mx-none justify-center">
            {currentItems.map((event) => (
              <Card
                key={event._id}
                className="flex flex-col justify-between h-full"
              >
                <div>
                  <div className="relative m-0 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none">
                    <img
                      src={event?.image}
                      alt="Event Image"
                      className="h-64 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                      {event?.title}
                    </h4>
                    <p className="font-sans text-md font-normal leading-relaxed text-gray-700">
                      {`Locations: ${event?.venue}`}
                    </p>
                    <p className="font-sans text-md font-normal leading-relaxed text-gray-700">
                      {`Date: ${event.startDate}-${event.endDate}`}
                    </p>
                    <p className="mt-2 block font-sans text-xl font-normal leading-relaxed text-gray-700 antialiased">
                      {shortenText(event.description, 60)}
                    </p>
                  </div>
                </div>
                <div className="p-6 mt-auto">
                  <Link to={`/event-details/${event._id}`}>
                    <button
                      className="rounded-lg bg-orange-400 p-2 text-white align-middle font-sans text-base transition-all hover:bg-orange-300 w-full"
                      type="button"
                    >
                      View Details
                    </button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Events;

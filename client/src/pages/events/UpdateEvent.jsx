import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleEvent,
  selectEvent,
  selectIsLoading,
  updateEvent,
} from "../../redux/features/events/eventSlice";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
const UpdateEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getSingleEvent(id));
  }, [dispatch, id]);

  const eventEdit = useSelector(selectEvent);
  const [event, setEvent] = useState(eventEdit);

  useEffect(() => {
    setEvent(eventEdit);
  }, [eventEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in event) {
      if (event.hasOwnProperty(key)) {
        if (event[key] === "") {
          toast.info(`${key} cannot be empty`);
          return;
        }
      }
    }

    if (event.startDate === event.endDate && event.endTime < event.startTime) {
      toast.error(
        "End Time cannot be before Start Time for the same day event"
      );
      return;
    }
    const formData = {
      title: event?.title,
      startDate: event?.startDate,
      endDate: event?.endDate,
      venue: event?.venue,
      organizer: event?.organizer,
      sponsors: event?.sponsors,
      startTime: event?.startTime,
      endTime: event?.endTime,
      image: event?.image,
      description: event?.description,
    };

    const data = await dispatch(updateEvent({ id, formData }));
    if (data.meta.requestStatus === "fulfilled") {
      // await dispatch(get());
      navigate("/admin/dashboard");
    }
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Update Event
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={event?.title}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-gray-700">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={event?.startDate}
                onChange={handleChange}
                min={today}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-gray-700">End Date</label>
              <input
                type="date"
                name="endDate"
                value={event?.endDate}
                onChange={handleChange}
                min={today}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-gray-700">Venue</label>
              <input
                type="text"
                name="venue"
                value={event?.venue}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-gray-700">Organizer</label>
              <input
                type="text"
                name="organizer"
                value={event?.organizer}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-gray-700">Sponsors</label>
              <input
                type="text"
                name="sponsors"
                value={event?.sponsors}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-gray-700">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={event?.startTime}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-gray-700">End Time</label>
              <input
                type="time"
                name="endTime"
                value={event?.endTime}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-gray-700">Image URL</label>
              <input
                type="text"
                name="image"
                value={event?.image}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={event?.description}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
              ></textarea>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-orange-400 text-white rounded-lg hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
              >
                Update Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateEvent;

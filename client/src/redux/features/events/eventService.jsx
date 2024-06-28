import axios from "axios";
import { BACKEND_URL } from "../auth/authService";

const createEvent = async (formData) => {
  const response = await axios.post(
    `${BACKEND_URL}/api/v1/events/event`,
    formData
  );
  return response.data;
};

const getEvents = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/v1/events/event`);
  return response.data;
};

const getSingleEvent = async (id) => {
  const response = await axios.get(`${BACKEND_URL}/api/v1/events/event/${id}`);
  return response.data;
};

const updateEvent = async (id, formData) => {
  const response = await axios.patch(
    `${BACKEND_URL}/api/v1/events/event/${id}`,
    formData
  );
  return response.data;
};
const deleteEvent = async (id) => {
  const response = await axios.delete(
    `${BACKEND_URL}/api/v1/events/event/${id}`
  );
  return response.data;
};

const eventService = {
  createEvent,
  getEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};

export default eventService;

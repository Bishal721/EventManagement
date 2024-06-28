const { writeFile } = require("fs").promises;
const path = require("path");
const asyncHandler = require("express-async-handler");
const { getEvents } = require("../utils/eventsDataRead");

const createEvent = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    startDate,
    endDate,
    venue,
    organizer,
    sponsors,
    startTime,
    endTime,
    image,
  } = req.body;

  if (
    !title ||
    !description ||
    !startDate ||
    !endDate ||
    !venue ||
    !sponsors ||
    !startTime ||
    !endTime ||
    !organizer ||
    !image
  ) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const events = getEvents();
  const titleExists = events.find((event) => event.title === title);

  if (titleExists) {
    res.status(400);
    throw new Error("Event with this title already exists");
  }

  const currenttime = new Date().getTime().toString();

  const newEvent = {
    _id: currenttime,
    title,
    description,
    startDate,
    endDate,
    venue,
    organizer,
    sponsors,
    startTime,
    endTime,
    image,
  };

  events.push(newEvent);
  const { _id } = newEvent;

  try {
    await writeFile(
      path.join(`${__dirname}/../data/events.json`),
      JSON.stringify(events, null, 2)
    );
    res.status(201).json({
      _id,
      title,
      description,
      startDate,
      endDate,
      venue,
      organizer,
      sponsors,
      startTime,
      endTime,
      image,
    });
  } catch (error) {
    console.error("Error Saving users to file:", error);
    res.status(500).send("Internal Server Error");
  }
});

const getAllEvents = asyncHandler(async (req, res) => {
  const events = getEvents();
  res.status(200).json(events);
});

const getSingleEvent = asyncHandler(async (req, res) => {
  const events = getEvents();
  const event = events.find((event) => event._id === req.params.id);
  if (event) {
    res.status(200).json(event);
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

const updateEvent = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    startDate,
    endDate,
    venue,
    organizer,
    sponsors,
    startTime,
    endTime,
    image,
  } = req.body;
  const events = getEvents();
  const eventIndex = events.findIndex((event) => event._id === req.params.id);
  if (eventIndex === -1) {
    res.status(404);
    throw new Error("Event not found");
  }

  const updatedEvent = {
    ...events[eventIndex],
    ...(title && { title }),
    ...(description && { description }),
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
    ...(venue && { venue }),
    ...(organizer && { organizer }),
    ...(sponsors && { sponsors }),
    ...(startTime && { startTime }),
    ...(endTime && { endTime }),
    ...(image && { image }),
  };
  events[eventIndex] = updatedEvent;

  try {
    await writeFile(
      path.join(`${__dirname}/../data/events.json`),
      JSON.stringify(events, null, 2)
    );
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500);
    throw new Error("Failed to save user data");
  }
});

const deleteEvent = asyncHandler(async (req, res) => {
  const events = getEvents();
  const eventIndex = events.findIndex((event) => event._id === req.params.id);
  if (eventIndex === -1) {
    res.status(404);
    throw new Error("Event not found");
  }
  events.splice(eventIndex, 1);
  try {
    await writeFile(
      path.join(`${__dirname}/../data/events.json`),
      JSON.stringify(events, null, 2)
    );
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500);
    throw new Error("Failed to save user data");
  }
});

module.exports = {
  createEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};

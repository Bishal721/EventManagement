const express = require("express");
const { Protected, adminOnly } = require("../middleware/authMiddleware");
const {
  createEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
} = require("../controller/eventController");
const router = express.Router();

router.post("/event", Protected, adminOnly, createEvent);
router.get("/event", getAllEvents);
router.get("/event/:id", getSingleEvent);
router.patch("/event/:id", Protected, adminOnly, updateEvent);
router.delete("/event/:id", Protected, adminOnly, deleteEvent);
module.exports = router;

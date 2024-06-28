const fs = require("fs");
const path = require("path");
let events;
function loadEvents() {
  try {
    const eventData = fs.readFileSync(
      path.join(`${__dirname}/../data/events.json`)
    );
    events = JSON.parse(eventData);
  } catch (error) {
    console.error("Error reading events data:", error.message);
    events = [];
  }
}

function getEvents() {
  return events;
}

module.exports = {
  loadEvents,
  getEvents,
};

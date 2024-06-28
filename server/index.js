const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 8000;
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const errorhandler = require("./middleware/errorhandler");
const userRoute = require("./routes/userRoute");
const eventRoute = require("./routes/eventRoute");
const { loadUsers } = require("./utils/userDataRead");
const { loadEvents } = require("./utils/eventsDataRead");

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors configuration
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
// load users from Json file
loadUsers();
loadEvents();

// Routes Middleware
app.use("/api/v1/users", userRoute);
app.use("/api/v1/events", eventRoute);

// Home page
app.get("/", (req, res) => {
  res.status(200).json({
    message: "THis is a home page",
  });
});

app.use(errorhandler);

const StartServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server Running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

StartServer();

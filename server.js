// Personal API Key for OpenWeatherMap API
// Note on the server side to be more secured
const apiKey = "adc6c5f8260e4e73f0c66f4e02ba3920&units=imperial";
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

/* Dependencies */
/* Middleware*/

const express = require("express");
const cors = require("cors");

// Start up an instance of app

const app = express();

const port = 3000;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.json());
// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
// Spin up the server
// Callback to debug

app.listen(port, () => {
  console.log("Server is up on port 3000.");
});

// Callback function to complete GET '/all'

app.get("/all", (req, res) => {
  res.send(projectData);
  console.log(projectData);
});

app.post("/addData", (req, res) => {
  data = {
    date: req.body.date,
    temp: req.body.temp,
    feelings: req.body.feelings,
  };
  //   save all data
  //   projectData = [...projectData, data];
  //   save only last one
  projectData = data;
  res.send(projectData);
});

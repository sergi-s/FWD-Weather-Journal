// Personal API Key for OpenWeatherMap API
//? example: https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=adc6c5f8260e4e73f0c66f4e02ba3920&zip=90011

const apiKey = "adc6c5f8260e4e73f0c66f4e02ba3920";
const units = "imperial"; // could use: "metric" "imperial"
const apiBaseURL = `https://api.openweathermap.org/data/2.5/weather?units=${units}&appid=${apiKey}`;

/* Global Variables */

let dateData = document.getElementById("date");
let tempData = document.getElementById("temp");
let feelingsData = document.getElementById("content");

let generate = document.getElementById("generate");
let feelings = document.getElementById("feelings");
let zip = document.getElementById("zip");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element

generate.addEventListener("click", getWeather);

/* Function called by event listener */
async function getWeather() {
  try {
    //make sure the user entered a zip code
    if (zip) {
      // complete the URL
      const url = `${apiBaseURL}&zip=${zip.value}`;

      //Calling other functions and chainig them using .then()
      getData(url).then(function (data = {}) {
        //visualize the returned data from the openweathermap
        // console.log(`data app.js 34 `);
        // console.log(data);
        /**
         * `main`
         *  `main.temp` Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
         *  from official documentation
         */

        postData("/addData", {
          date: newDate,
          temp: data.main.temp,
          feelings: feelings.value,
        }).then(updateUI);
      });
    } else {
      // did not enter zip code
      alert("Pleace enter a zip code");
    }
  } catch (e) {
    console(`Error ${e}`);
    return e;
  }
}

async function getData(url) {
  // catch errors
  try {
    // Getting data from api and returning it
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod != 200) {
      throw `status: ${data.cod}, Error:${data.message}`;
    }

    return data;
  } catch (error) {
    // display errors
    alert(`error: ${error}`);
  }
}

/* Function to POST data */

async function postData(url = "", data = {}) {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // catch errors
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    // display errors
    console.log(`error: ${error}`);
  }
}

/* Function to GET Project Data */
async function updateUI() {
  // getting data from server.js e.g backend
  const req = await fetch("/all");

  // catch errors
  try {
    const projectData = await req.json();

    //Update the frontend
    dateData.innerHTML = `Date: ${projectData.date}`;
    tempData.innerHTML = `Temperature: ${projectData.temp}`;
    feelingsData.innerHTML = `I feel: ${projectData.feelings}`;
  } catch (error) {
    // display errors
    console.log(`error: ${error}`);
  }
}
/* Function to GET Web API Data*/

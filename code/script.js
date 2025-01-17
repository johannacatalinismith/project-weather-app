//Declare variables that refer to HTML elements (DOM-selector)
const weatherType = document.querySelector(".weatherType");
const temperature = document.querySelector(".temperature");
const sunrise = document.querySelector(".sunrise");
const textAboutWeather = document.querySelector(".textAboutWeather");
const sunset = document.querySelector(".sunset");
const icon = document.querySelector(".icon");
const days = document.querySelector(".days");

//Declare (global) varibles

const weatherUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=781cdd2e00a90d16de41361eb1c43353";

const forecastUrl =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=781cdd2e00a90d16de41361eb1c43353";

//Declare funtions "hourAndminutes" and "renderWeather"

//Here we turn the time into a string and set it to xx.xx (four numbers)
//"date" is an object built in in js, so you can work with time and dates.
function hourAndminutes(date) {
  return `${date.getHours().toString().padStart(2, "0")}.${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

//This function renders the weather
function renderWeather(weather) {
  weatherType.innerHTML = weather.weather[0].main;

  //math.round to remove the decimals from the degrees. "&deg" is the degree symbol.
  temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;`;

  //"new.date" is the timestamp from the 1970's. "*1000 is the turn the time into milliseconds, because js want's it like that."
  const sunriseTime = new Date(weather.sys.sunrise * 1000);

  sunrise.innerHTML = `Sunrise ${hourAndminutes(sunriseTime)}`;

  const sunsetDate = new Date(weather.sys.sunset * 1000);
  sunset.innerHTML = `Sunset ${hourAndminutes(sunsetDate)}`;

  if (weather.weather[0].main == "Clouds") {
    //to style icons class needs to be added in js, not html
    icon.innerHTML = `<img class = "icon" src="/icons/cloud.svg" />`;
    textAboutWeather.innerHTML = `Light a fire and get cosy. Stockholm is looking grey today.`;
    document.body.classList.add("clouds");
  } else if (weather.weather[0].main == "Rain") {
    icon.innerHTML = `<img class = "icon" src="/icons/umbrella.svg" />`;
    textAboutWeather.innerHTML = `Don't forget your umbrella. It's wet in Stockholm today.`;
    document.body.classList.add("rain");
  } else {
    icon.innerHTML = `<img class = "icon" src="/icons/sunglasses.svg" />`;
    textAboutWeather.innerHTML = `Get your sunnies on. Stockholm is looking rather great today.`;
    document.body.classList.add("sunny");
  }
}

fetch(weatherUrl)
  //Then&respons turns the data from url into a object
  .then((response) => response.json())
  //"weather" comes from the api data
  .then((weather) => {
    //Call the function to run here
    renderWeather(weather);
  });

//This function renders the forecast
function renderForecast(forecast) {
  //for is because this is a loop that runs through the days. Before working with degree it was only one value (no array).
  for (const day of forecast.list) {
    const date = new Date(day.dt * 1000);
    //13 is the time of the day when we are going to measure the temperature.
    if (date.getHours() == 13) {
      days.innerHTML += `
   <li> 
    <span> ${date.toLocaleDateString("en", {
      weekday: "short",
    })}</span>
    <span>${Math.round(day.main.temp)}&deg;</span>
    </li>
     `;
    }
  }
}

fetch(forecastUrl)
  .then((response) => response.json())
  .then((forecast) => {
    renderForecast(forecast);
  });

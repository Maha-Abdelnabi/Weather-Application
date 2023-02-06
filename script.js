var timeEl = document.getElementById("time");
var dateEl = document.getElementById("date");
var result = document.getElementById("result");
var searchBtn = document.getElementById("search-btn");
var cuurentWeatherItemsEl = document.getElementById("current-weather-items");
var timezone = document.getElementById("time-zone");
var countryEl = document.getElementById("country");
var cityEl = document.querySelector(".city");
var tempEl = document.querySelector(".temp");
var iconEl = document.querySelector(".w-icon");
var descriptionEl = document.querySelector(".description");
var humidityEl = document.getElementById("humidity");
var windEl = document.getElementById("wind");

var weatherForcastEl = document.getElementById("weather-forcast");
var currentTempEl = document.getElementById("current-temp");

//updat time
timeEl.innerHTML = dayjs().format("hh:mm a");
dateEl.innerHTML = dayjs().format("dddd, MMMM D");

//weather API
var weather = {
  apiKey: "02815d09506c4c8e1b0ee7470e58e399",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  //display weather on the page
  displayWeather: function (data) {
    var { name } = data;
    var { icon, description } = data.weather[0];
    var { temp, humidity } = data.main;
    var { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    cityEl.innerText = name;
    tempEl.innerText = temp + "C";
    iconEl.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    descriptionEl.innerText = description;
    humidityEl.innerText = "Humidity: " + humidity + "%";
    windEl.innerText = "Wind Speed: " + speed + "km/h";
  },

  search: function () {
    this.fetchWeather(countryEl.value);
  },
};
$("#search-btn").on("click", function () {
  weather.search();
});

//if user press enter for search
$("#country").on("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

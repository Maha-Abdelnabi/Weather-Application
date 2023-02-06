
//select elements
var timeEl = document.getElementById("time");
var dateEl = document.getElementById("date");
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
var dayEl = document.querySelectorAll(".day");

//updat time for now
timeEl.innerHTML = dayjs().format("hh:mm a");
dateEl.innerHTML = dayjs().format("dddd, MMMM D");

//weather API for today
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
      .then((data) => this.displayWeather(data)); //data from api
//this api for 5 days forcast
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayForcast(data));
  },

  //function to display weather on the page..by getting the elements on the page and replace the content
  displayWeather: function (data) {
    var { name } = data;
    var { icon, description } = data.weather[0]; //[]because it's array contain objects
    var { temp, humidity } = data.main;
    var { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    cityEl.innerText = name;
    tempEl.innerText = "Temp: " + temp + "c";
    iconEl.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    descriptionEl.innerText = description;
    humidityEl.innerText = "Humidity: " + humidity + "%";
    windEl.innerText = "Wind Speed: " + speed + "km/h";
  },

  //display the 5 days forcast on the page
  displayForcast: function (data) {
    var dayCount = 1;
    //looping the data to get 5 days info
    for (var i = 0; i < data.list.length && dayCount < 6; i++) {
        //var to show the next day date
      var nextDay = dayjs().add(dayCount, "day").format("YYYY-MM-DD 12:00:00");
      //this var to display how the date is going to look on each card
      var dayOftheWeek = dayjs().add(dayCount, "day").format("ddd MM D");
      console.log(dayOftheWeek);
      //to start from tommorow..because I already have the same day weather
      if (data.list[i].dt_txt == nextDay) {
        var { icon, description } = data.list[i].weather[0];
        var { temp, humidity } = data.list[i].main;
        var { speed } = data.list[i].wind;
        var dt_txt = data.list[i].dt_txt;
        console.log(icon, description, temp, humidity, speed, dt_txt);
        //added the dayCount to each element..so it's going to apply the data on the next element every time until the loop stops
        document.querySelector(".day-" + dayCount).innerText = dayOftheWeek;
        document.getElementById("tempreture" + dayCount).innerText =
          "Temp: " + temp + "c";
        document.querySelector(".icons" + dayCount).src =
          "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.getElementById("wind" + dayCount).innerText =
          "Wind: " + speed + "km/h";
        document.getElementById("humid" + dayCount).innerText =
          "Humidity: " + humidity + "%";
          //add one more and repeat
        dayCount = dayCount + 1;
      }
    }
  },
  //function for getting the content of the search bar
  search: function () {
    this.fetchWeather(countryEl.value);
  },
};
//on click it's going to search for the weather
$("#search-btn").on("click", function () {
  weather.search();
});

//if user press enter for search
$("#country").on("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});


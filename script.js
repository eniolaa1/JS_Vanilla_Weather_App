const updateTime = (timeStamp) => {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  hours = hours < 10 ? "0" + hours : hours;
  let minutes = now.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let time = `${hours}:${minutes}`;
  hours = hours <= 12 ? "AM" : "PM";

  return `${day}, ${time}${hours}`;
};

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

const getCoordinates = (coordinates) => {
  let apiKeys = "701f06352d61835bc4fc894e7b084629";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKeys}&units=metric`;
  // let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKeys}&units=metric`;
  // let apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKeys}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
};

//Get cuurent weather and show it on the screen using axios
const defaultInfo = () => {
  let apiKeys = "701f06352d61835bc4fc894e7b084629";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Lagos";
  let metricUnit = "&units=metric";
  let desc = document.querySelector(".desc");
  let deg = document.querySelector(".degrees");
  let wind = document.querySelector(".wind");
  let humidity = document.querySelector(".humidity");
  let pressure = document.querySelector(".pressure");
  let feels = document.querySelector(".feels");
  let date = document.querySelector(".date");
  let currentIcon = document.querySelector(".current_icon");

  const displayInfo = (response) => {
    let main = response.data.weather[0].description;
    let temp = Math.round(response.data.main.temp);
    let humidityElement = response.data.main.humidity;
    let pressureElement = response.data.main.pressure;
    let windElement = response.data.wind.speed;
    let feelsElement = Math.round(response.data.main.feels_like);

    desc.innerText = main;
    deg.innerHTML = `${temp}°<a href='' class='unit fs-3 text-decoration-none text-dark fw-semibold'>C</a>`;
    humidity.style.color = "#666";
    humidity.style.fontSize = "14px";
    humidity.innerText = `${humidityElement} %`;
    pressure.style.color = "#666";
    pressure.style.fontSize = "14px";
    pressure.innerText = `${pressureElement} mb`;
    wind.style.color = "#666";
    wind.style.fontSize = "14px";
    wind.innerText = `${windElement} km/hr`;
    feels.style.color = "#666";
    feels.innerText = `${feelsElement}°`;
    date.style.color = "#666";
    date.style.fontSize = "14px";
    date.innerText = updateTime(response.data.dt * 1000);
    currentIcon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
    );
    getCoordinates(response.data.coord);
  };

  axios.get(`${apiUrl}${metricUnit}&appid=${apiKeys}`).then(displayInfo);
};

defaultInfo();

const displayForecast = (response) => {
  let forecast = response.data.list;
  console.log(forecast);
  let futureForecastElement = document.querySelector(".future");
  let forecastHtml = '<div class="future row gap-3 pt-3 text-center me-auto">';

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHtml += `
        <div class="future_col col-sm rounded-4 pt-3">
          <p class="week_day">${formatDay(forecastDay.dt)}</p>
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="" class="forecast_icon" />
          <p class="mt-3">
            <span class="high_temp">${Math.round(
              forecastDay.main.temp_max
            )}&deg;</span>
            <span class="low_temp">${Math.round(
              forecastDay.main.temp_min
            )}&deg;</span>
          </p>
        </div>`;
    }
  });

  forecastHtml += "</div>";
  futureForecastElement.innerHTML = forecastHtml;
};

let form = document.querySelector(".my-form");
form.addEventListener("submit", function (event) {
  let searchInput = document.getElementById("search-input");
  let city = document.querySelector(".city");
  let desc = document.querySelector(".desc");
  let deg = document.querySelector(".degrees");
  let wind = document.querySelector(".wind");
  let humidity = document.querySelector(".humidity");
  let pressure = document.querySelector(".pressure");
  let feels = document.querySelector(".feels");
  let date = document.querySelector(".date");
  let currentIcon = document.querySelector(".current_icon");
  event.preventDefault(); // Prevent form submission from refreshing the page
  let cityName = `?q=${searchInput.value}`;
  let metricUnit = "&units=metric";
  let apiKeys = "701f06352d61835bc4fc894e7b084629";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  const displayInfo = (response) => {
    let entry = response.data.name;
    let main = response.data.weather[0].description;
    let temp = Math.round(response.data.main.temp);
    let windElement = response.data.wind.speed;
    let pressureElement = response.data.main.pressure;
    let humidityElement = response.data.main.humidity;
    let feelsElement = Math.round(response.data.main.feels_like);

    city.innerText = entry;
    desc.innerText = main;
    deg.innerHTML = `${temp}°<a href='' class='unit fs-3 text-decoration-none text-dark fw-semibold'>C</a>`;
    humidity.style.color = "#666";
    humidity.style.fontSize = "14px";
    humidity.innerText = `${humidityElement} %`;
    pressure.style.color = "#666";
    pressure.style.fontSize = "14px";
    pressure.innerText = `${pressureElement} mb`;
    wind.style.color = "#666";
    wind.style.fontSize = "14px";
    wind.innerText = `${windElement} km/hr`;
    feels.style.color = "#666";
    feels.innerText = `${feelsElement}°`;
    date.style.color = "#666";
    date.style.fontSize = "14px";
    date.innerText = updateTime(response.data.dt * 1000);
    currentIcon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    getCoordinates(response.data.coord);
  };
  axios
    .get(`${apiUrl}${cityName}${metricUnit}&appid=${apiKeys}`)
    .then(displayInfo);
});

let currentBtn = document.querySelector(".current");
currentBtn.addEventListener("click", function () {
  function handlePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiUrl = "https://api.openweathermap.org/data/2.5/weather";
    let apiKeys = "701f06352d61835bc4fc894e7b084629";
    let metricUnit = "&units=metric";

    function displayInfo(response) {
      let city = document.querySelector(".city");
      let desc = document.querySelector(".desc");
      let deg = document.querySelector(".degrees");
      let humidity = document.querySelector(".humidity");
      let pressure = document.querySelector(".pressure");
      let wind = document.querySelector(".wind");
      let feels = document.querySelector(".feels");
      let date = document.querySelector(".date");
      let currentIcon = document.querySelector(".current-icon");

      let entry = response.data.name;
      let main = response.data.weather[0].description;
      let temp = Math.round(response.data.main.temp);
      let windElement = response.data.wind.speed;
      let pressureElement = response.data.main.pressure;
      let humidityElement = response.data.main.humidity;
      let feelsElement = Math.round(response.data.main.feels_like);

      city.innerText = entry;
      desc.innerText = main;
      desc.style.color = "#666";
      desc.style.fontWeight = "bold";
      deg.innerHTML = `${temp}°<a href='' class='unit fs-3 text-decoration-none text-dark fw-semibold'>C</a>`;
      humidity.style.color = "#666";
      humidity.style.fontSize = "14px";
      humidity.innerText = `${humidityElement} %`;
      pressure.style.color = "#666";
      pressure.style.fontSize = "14px";
      pressure.innerText = `${pressureElement} mb`;
      wind.style.color = "#666";
      wind.style.fontSize = "14px";
      wind.innerText = `${windElement} km/hr`;
      feels.style.color = "#666";
      feels.innerText = `${feelsElement}°`;
      date.style.color = "#666";
      date.style.fontSize = "14px";
      date.innerText = updateTime(response.data.dt * 1000);
      currentIcon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
      );
      getCoordinates(response.data.coord);
      updateTime();
    }

    axios
      .get(
        `${apiUrl}?lat=${latitude}&lon=${longitude}${metricUnit}&appid=${apiKeys}`
      )
      .then(displayInfo);
  }

  navigator.geolocation.getCurrentPosition(handlePosition);
});

let fahrenheitLink = document.querySelector(".fahrenheit");

fahrenheitLink.addEventListener("click", function (event) {
  event.preventDefault();
  let degreesElement = document.querySelector(".degrees");
  let unitElement = degreesElement.querySelector(".unit");
  let degreesText = degreesElement.innerText.trim();
  let degrees = parseFloat(degreesText);

  if (isNaN(degrees)) {
    alert("Invalid temperature value.");
    return;
  }

  if (unitElement.innerText === "C") {
    var fahrenheit = Math.round((degrees * 9) / 5 + 32);
    degreesElement.innerHTML = `${fahrenheit}°<a href='' class='unit fs-3 text-decoration-none text-dark fw-semibold'>F</a>`;
    unitElement.innerText = "F";
    fahrenheitLink.innerText = "Celsius?";
  } else {
    var celsius = Math.round(((degrees - 32) * 5) / 9);
    degreesElement.innerHTML = `${celsius}°<a href='' class='unit fs-3 text-decoration-none text-dark fw-semibold'>C</a>`;
    unitElement.innerText = "C";
    fahrenheitLink.innerText = "Fahrenheit?";
  }
});

displayForecast();

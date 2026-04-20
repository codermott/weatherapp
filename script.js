const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");
const weatherCard = document.getElementById("weatherCard");
const cityName = document.getElementById("cityName");
const weatherMain = document.getElementById("weatherMain");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");

const apiKey = "aaf11f75dd69893bc7ad793ba2f7b68c";

async function getWeather() {
  const city = cityInput.value.trim();

  if (city === "") {
    message.textContent = "Please enter a city name";
    weatherCard.classList.add("hidden");
    return;
  }

  message.textContent = "Loading weather...";
  weatherCard.classList.add("hidden");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      message.textContent = "City not found. Please try again.";
      weatherCard.classList.add("hidden");
      return;
    }

    cityName.textContent = data.name;
    weatherMain.textContent = "Condition: " + data.weather[0].main;
    temperature.textContent = "Temperature: " + data.main.temp + "°F";
    feelsLike.textContent = "Feels Like: " + data.main.feels_like + "°F";
    humidity.textContent = "Humidity: " + data.main.humidity + "%";
    windSpeed.textContent = "Wind Speed: " + data.wind.speed + " mph";

    message.textContent = "";
    weatherCard.classList.remove("hidden");
  } catch (error) {
    message.textContent = "Something went wrong. Please try again.";
    weatherCard.classList.add("hidden");
  }
}

searchBtn.addEventListener("click", function() {
  getWeather();
});

cityInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    getWeather();
  }
});

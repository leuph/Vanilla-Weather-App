function search(city) {
  let apiKey = "472f731f6bc31a7ff3af040te3ofbdf5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  console.log();
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-field");
  search(cityInputElement.value);
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = ["Sunday", "Monday", "Tuesday", "Thursday", "Friday", "Saturday"];
  let day = date.getDay();
  return `${days[day]} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#main-temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

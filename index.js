const container = document.querySelector(".container");
const searc = document.querySelector(".search button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error = document.querySelector(".not-found");

searc.addEventListener("click", () => {
  const APIKey = "765da4a0c2f8995ae303621c86eb8047";
  const city = document.querySelector(".search input").value;

  if (city == "") {
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        container.style.height = "600px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error.style.display = "block";
        error.classList.add("fadeIn");
        return;
      }

      error.style.display = "none";
      error.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind-speed span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "asserts/sunny.png";
          break;

        case "Rain":
          image.src = "asserts/rain.png";
          break;

        case "Fog":
          image.src = "asserts/fog.png";
          break;

        case "Clouds":
          image.src = "asserts/cloud.png";
          break;

        case "Snow":
          image.src = "asserts/snow.png";
          break;

        default:
          image.src = "";
      }

      image.style.height = "200px";

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});

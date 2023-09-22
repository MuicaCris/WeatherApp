const history = [];

localStorage.setItem("addToHistory", JSON.stringify(addToHistory));
const data = localStorage.getItem("addToHistory");
console.log(data);

let weather = {
  apiKey: "d1bd6c6eb2b739189f2cd3d1f2ac84e4",

  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" 
      + city 
      + "&units=metric&appid=" 
      + this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = "Weather in " + name;

    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";

    document.querySelector(".description").innerText = description;

    document.querySelector(".temp").innerText = temp + "°C";

    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";

    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";

    document.querySelector(".weather").classList.remove("loading");
  },
  
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  }
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Reghin");

function addToHistory() {
  const historyList = document.querySelector(".item-history");
  const searchedContent = document.querySelector(".search-bar").textContent;
  
  if (history.length === 5) {
    for (let i = 1; i < 5; i++)
      history[i - 1] = history[i];
  }

  history[history.length] = searchedContent;
}
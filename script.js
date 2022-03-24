// day and time functionality
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let now = new Date();
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

let dateAndTime = document.getElementById("displayDate&Time");
dateAndTime.innerHTML = `${day} ${hours}:${minutes} AM CST`;

// search engine functionality
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// unit change functionality
function toFahrenheit(event) {
    let currentTemperature = document.getElementById("currentTemperature");
    currentTemperature.innerHTML = `It's <strong>87</strong>`
}

function toCelsius(event) {
    let currentTemperature = document.getElementById("currentTemperature");
    currentTemperature.innerHTML = `It's <strong>31</strong>`
}

let celsiusbtn = document.getElementById("celsius-mode");
celsiusbtn.addEventListener("click", toCelsius);

let fahrenheitbtn = document.getElementById("fahrenheit-mode");
fahrenheitbtn.addEventListener("click", toFahrenheit);


// update widget functionality
let apiKey = "bf9742d9298fb24ce9a6a2797fbabace"

function changeDisplays(response) {
    console.log(response.data);
    let displayCity = document.getElementById("displayCity&State");
    displayCity.innerHTML = `in ${response.data.name}, ${response.data.sys.country}`;
    let displayTemperature = document.getElementById("currentTemperature");
    displayTemperature.innerHTML = `It's <strong>${Math.round(response.data.main.temp)}</strong>`;

}

function updateWidget() {
    searchedCity = document.querySelector('#cityInput').value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(changeDisplays);
}

let changeCity = document.getElementById("citySubmit");
changeCity.addEventListener("click", updateWidget);

// current location functionality
function handlePosition(position) {
    let apiUrlCurr = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
    axios.get(`${apiUrlCurr}&appid=${apiKey}`).then(changeDisplays);
}

function updateWidgetByCurrentLocation() {
    currentLocation = navigator.geolocation.getCurrentPosition(handlePosition)
}

let currentLocationSubmit = document.getElementById("currentLocationButton");
currentLocationSubmit.addEventListener("click", updateWidgetByCurrentLocation);
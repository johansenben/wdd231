const apiKey = "098b0703862ffd84b43084cf731bfeca";
const longitude = -112.84;
const latitude = 49.70;
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
const weatherDataElement = document.querySelector(".weather-data");

const formatDate = (dateObj) => {
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const am_pm = hours >= 12 ? "PM" : "AM";
    return  `${hours % 12}:${minutes} ${am_pm}`;
}
const displayWeatherData = async (url) => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            weatherDataElement.querySelector("#current-temp").textContent = Math.round(data.main.temp);
            weatherDataElement.querySelector("#weather-desc").textContent = data.weather[0].description;
            weatherDataElement.querySelector("#high-temp").textContent = Math.round(data.main.temp_max);
            weatherDataElement.querySelector("#low-temp").textContent = Math.round(data.main.temp_min);
            weatherDataElement.querySelector("#humidity").textContent = Math.round(data.main.humidity);
            const unixSunrise = data.sys.sunrise;
            weatherDataElement.querySelector("#sunrise").textContent = formatDate(new Date(unixSunrise * 1000));
            const unixSunset = data.sys.sunset;
            weatherDataElement.querySelector("#sunset").textContent = formatDate(new Date(unixSunset * 1000));
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}
displayWeatherData(weatherUrl);



const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
const forcastDataElement = document.querySelector(".weather-forcast");


const displayForcastData = async (url) => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();

            const todayTemp = Math.round(data.list[0].main.temp);
            forcastDataElement.querySelector("#today-forcast").textContent = todayTemp;

            const tomorrowTemp = Math.round(data.list[8].main.temp);
            forcastDataElement.querySelector("#tomorrow-forcast").textContent = tomorrowTemp;

            const day3Temp = Math.round(data.list[16].main.temp);
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const day3Weekday = days[(new Date(data.list[16].dt * 1000)).getDay()];
            forcastDataElement.querySelector("#day3-forcast").innerHTML = `${day3Weekday}: ${day3Temp}&deg;C`;

        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}
displayForcastData(forcastUrl);

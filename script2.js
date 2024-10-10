const API_KEY = '206386da85fabf1ffb7fc200cf61c0e0';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    try {
        // Fetch current weather
        const weatherResponse = await fetch(`${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`);
        const weatherData = await weatherResponse.json();
        displayCurrentWeather(weatherData);

        // Fetch 5-day forecast
        const forecastResponse = await fetch(`${BASE_URL}forecast?q=${city}&appid=${API_KEY}&units=metric`);
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);

    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch weather data.');
    }
}
async function displayCurrentWeather(data) {
    const weatherBody = document.getElementById('weatherBody');

    const fetchh = await fetch(`https://restcountries.com/v3.1/alpha/${data.sys.country}`);
    const countryData = await fetchh.json();
    console.log(countryData[0].name.common)
    weatherBody.innerHTML = `
        <tr>
            <td>${data.name}</td>
            <td>${countryData[0].name.common}</td>
            <td>${data.main.temp}°C</td>
            <td>${data.weather[0].description}</td>
        </tr>
    `;
}

function displayForecast(data) {
    const forecastBody = document.getElementById('forecastBody');
    forecastBody.innerHTML = '';

    // Forecast data comes in 3-hour intervals, so we'll filter to get daily forecasts
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00'));
    dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt_txt).toLocaleDateString();
        forecastBody.innerHTML += `
            <tr>
                <td>${date}</td>
                <td>${forecast.main.temp}°C</td>
                <td><img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" class="forcast-image"></td>
                <td>${forecast.weather[0].description}</td>
            </tr>
        `;
    });
}

function getWeather() {
    const city = document.getElementById('cityInput').value || 'Delhi'; 

    
    const API_KEY = '0206abcc88aae0c21dfa09af3c5a0375';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            
            const currentWeather = data.list[0];
            const forecast = data.list.slice(1, 8);

            
            const currentWeatherElement = document.getElementById('currentWeather');
            currentWeatherElement.innerHTML = `
                <h2>Current Weather in ${city}</h2>
                <p>Condition: ${currentWeather.weather[0].description}</p>
                <p>Temperature: ${Math.round(currentWeather.main.temp - 273.15)}°C</p>
                <p>Humidity: ${currentWeather.main.humidity}%</p>
                <p>Wind Speed: ${currentWeather.wind.speed} m/s</p>
            `;

            
            const forecastContainer = document.getElementById('forecastContainer');
            forecastContainer.innerHTML = '';
            forecast.forEach((dayData, index) => {
                const date = new Date(dayData.dt * 1000);
                const temperature = Math.round(dayData.main.temp - 273.15);
                const humidity = dayData.main.humidity;
                const condition = dayData.weather[0].description;

                
                const forecastCard = document.createElement('div');
                forecastCard.classList.add('forecast-card');
                forecastCard.innerHTML = `
                    <h3>Day ${index + 1}</h3>
                    <p>Date: ${date.toDateString()}</p>
                    <p>Temperature: ${temperature}°C</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Conditions: ${condition}</p>
                `;
                forecastContainer.appendChild(forecastCard);
            });

            
            createChart('temperatureChart', 'Temperature (°C)', forecast.map(item => Math.round(item.main.temp - 273.15)));
            createChart('humidityChart', 'Humidity (%)', forecast.map(item => item.main.humidity));
            createChart('conditionsChart', 'Conditions', forecast.map(item => item.weather[0].description));
        })
        .catch(error => console.error('Error:', error));
}


const getWeatherButton = document.querySelector('button');
getWeatherButton.addEventListener('click', getWeather);

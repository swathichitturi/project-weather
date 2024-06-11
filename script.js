
const apiKey= "cd7b7e5eca4b3ceedb19d9108c19d5bf";
const apiUrl= "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
function handleEnter(event) {
    if (event.key === 'Enter') {
      // Trigger a click event on the search button (or any other element)
      document.getElementById('searchButton').click();
    }
  }
// const weatherIcon = document.querySelector(".weather-icon");
const weatherIcon = document.getElementById('weatherIcon');
const errorElement = document.getElementById('inputError');
errorElement.style.display = 'none';

async function checkWeather(city) {
const response= await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        errorElement.style.display="block";
        document.querySelector(".weather").style.display="none";
    } else {
        errorElement.style.display = 'none';
        document.querySelector(".weather").style.display="block";
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C" ;
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";
        
        let weatherType = 'unknown';

        if (data.weather && data.weather.length > 0 && data.weather[0].main) {
            weatherType = data.weather[0].main.toLowerCase();
        }
        console.log(weatherType);
        if(weatherType == "clouds"){
            weatherIcon.src="./images/clouds.png";
        }
        else if(weatherType == "clear"){
            weatherIcon.src="./images/clear.png";
        }
        else if(weatherType == "drizzle"){
            weatherIcon.src="./images/drizzle.png";
        }
        else if(weatherType == "mist"){
            weatherIcon.src="./images/mist.png";
        }
        else if(weatherType == "rain"){
            weatherIcon.src="./images/rain.png";
        }
        else if(weatherType == "snow"){
            weatherIcon.src="./images/snow.png";
        }
        document.querySelector(".weather").style.display= "block";
        document.querySelector(".error").style.display="none";

    }     
}
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});

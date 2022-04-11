const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.querySelector('.form');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');



// Por defecto la cuidad al renderizar la aplicación es London
let cityInput = geolocation();
console.log(cityInput);

// Agregar click evento en las cuidad del panel
cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerText;
        
        fetchWeatherData();

        app.style.opaicty = '0';
    });   
})

// Agregar evento al formulario
form.addEventListener('submit', (e) => {
    if(search.value.length == 0){
        alert('Ingrese una ciudad');
    } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = '';
        app.style.opacity = '0';
    }
    e.preventDefault();
    // console.log(search.value);
});


function daysOfTheWeek(day, month, year) {
    const weekday = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
    // console.log(weekday);
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};

function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=dfa9598b22774423b7a181741221104&q=${cityInput}&aqi=yes`)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        temp.innerHTML = data.current.temp_c + '&#176;';
        conditionOutput.innerHTML = data.current.condition.text;

        const date = data.location.localtime;
        const y = parseInt(date.substring(0, 4));
        const m = parseInt(date.substring(5, 2));
        const d = parseInt(date.substring(8, 2));
        const time = date.substring(11);
        
        dateOutput.innerHTML = `${d}/${m}/${y}`;
        timeOutput.innerHTML = time;
        
        nameOutput.innerHTML = data.location.name;
        
        const iconId = data.current.condition.icon.substring('//cdn.weatherapi.com/weather/64x64/'.length);
        icon.src = './src/icons/' + iconId;
        
        cloudOutput.innerHTML = data.current.cloud + '%';
        humidityOutput.innerHTML = data.current.humidity + '%';
        windOutput.innerHTML = data.current.wind_kph + 'km/h';
        
        let timeOfDay = 'day';
        
        const code = data.current.condition.code;
        
        if(!data.current.is_day) {
            timeOfDay = 'night';
        }
        
        if(code == 1000) {
            app.style.backgroundImage = `url(../src/img/${timeOfDay}/clear.jpg)`;
            
            btn.style.background = '#e5ba92';
            
            if(timeOfDay == 'night') {
                btn.style.background = '#181e27';
            }
        }

        else if(
            code == 1003 ||
            code == 1006 ||
            code == 1009 ||
            code == 1030 ||
            code == 1069 ||
            code == 1087 ||
            code == 1135 ||
            code == 1273 ||
            code == 1276 ||
            code == 1279 ||
            code == 1282
            ){
                app.style.backgroundImage = `url(../src/img/${timeOfDay}/cloudy.jpg)`;
                btn.style.background = '#fa6d1b';
            if(timeOfDay == 'nigth') {
                btn.style.background = '#181e27';
            }
        } else if(
            code == 1003 ||
            code == 1006 ||
            code == 1009 ||
            code == 1030 ||
            code == 1069 ||
            code == 1087 ||
            code == 1135 ||
            code == 1273 ||
            code == 1276 ||
            code == 1279 || 
            code == 1282
        ){
            app.style.backgroundImage = `url(../src/img/${timeOfDay}/cloudy.jpg)`;
            btn.style.background = '#fa6d1b';
            if(timeOfDay == 'night') {
                btn.style.background = '#181e27';
            }
        } else {
            app.style.backgroundImage = `url(../src/img/${timeOfDay}/snow.jpg)`;
            btn.style.background = '#4d72aa';
            if(timeOfDay == 'night') {
                btn.style.background = '#1b1b1b';
            }
        }
        
        app.style.opacity = '1';
    });

//     .catch(() =>{
    //         alert('No se encontró la ciudad');
    //         app.style.opacity = '1';
//     });
}

function geolocation() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            
            // const url = `https://api.weatherapi.com/v1/current.json?key=dfa9598b22774423b7a181741221104&q=${lat},${lon}&aqi=yes`
            // console.log(lat, lon)
            // fetchWeatherData();
            return `${lat},${lon}`
        });
    }
}

fetchWeatherData();

app.style.opacity = '1';
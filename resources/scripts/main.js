import weather from './weather.js';
import location from './location.js';


const names = [
    'city',
    'country',
    'main_weather',
    'main_temp',
    'weather_icon',
    'weather_description',
    'min_temp',
    'max_temp',
    'humidity',
    'main_measure'
];

const documentSelectors = {
    measure: document.querySelectorAll('.measure'),
    documentMain: document.querySelector('main'),
};
const weatherThings = {};

for (let i = 0; i < names.length; i++) {
    documentSelectors[names[i]] = document.getElementById(`${names[i]}`);
    weatherThings[names[i]] = null;
}


location()
    .then(receivedCoords => weather(receivedCoords), error => {
        console.log(error);
        documentSelectors.documentMain.innerHTML = error;
    })
    .then(weatherReceivedObject => {
        weatherThings.city = weatherReceivedObject.name;
        weatherThings.weather_icon = weatherReceivedObject.weather[0].icon;
        weatherThings.humidity = weatherReceivedObject.main.humidity;
        weatherThings.weather_description = weatherReceivedObject.weather[0].description;
        weatherThings.main_weather = weatherReceivedObject.weather[0].main;
        weatherThings.country = weatherReceivedObject.sys.country;
        weatherThings.min_temp = parseInt(weatherReceivedObject.main.temp_min);
        weatherThings.max_temp = parseInt(weatherReceivedObject.main.temp_max);
        weatherThings.main_temp = parseInt(weatherReceivedObject.main.temp);

        for (let selector in documentSelectors) {
            if (selector === 'measure' 
            || selector === 'documentMain' 
            || selector === 'weather_icon' 
            || selector === 'main_measure') continue;
            documentSelectors[selector].innerHTML = weatherThings[selector];
        }

        documentSelectors.weather_icon.setAttribute('src', weatherThings.weather_icon);

        let measure = 'C';
        const minFahrenheit = toFahrenheit(weatherThings.min_temp);
        const maxFahrenheit = toFahrenheit(weatherThings.max_temp);
        const fahrenheit = toFahrenheit(weatherThings.main_temp);

        function changeMeasure(measure) {
            for (let i = 0; i < documentSelectors.measure.length; i++) {
                documentSelectors.measure[i].innerHTML = measure;
            }
            
            documentSelectors.main_measure.innerHTML = measure;

            if (measure === 'C') {
                documentSelectors.main_temp.innerHTML = weatherThings.main_temp;
                documentSelectors.max_temp.innerHTML = weatherThings.max_temp;
                documentSelectors.min_temp.innerHTML = weatherThings.min_temp;
            }
            else if (measure === 'F') {
                documentSelectors.main_temp.innerHTML = fahrenheit;
                documentSelectors.max_temp.innerHTML = maxFahrenheit;
                documentSelectors.min_temp.innerHTML = minFahrenheit;
            }
        }    
        changeMeasure(measure);

        documentSelectors.main_measure.addEventListener('click', () => {
            if (measure === 'C') measure = 'F';
            else if (measure === 'F') measure = 'C';

            changeMeasure(measure);
        });
    });

    
function toFahrenheit(celsius) {
    return parseInt((celsius * 1.8) + 32);
}
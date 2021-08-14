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
        weatherThings.min_temp = weatherReceivedObject.main.temp_min;
        weatherThings.max_temp = weatherReceivedObject.main.temp_max;
        weatherThings.main_temp = weatherReceivedObject.main.temp;

        for (let selector in documentSelectors) {
            if (selector === 'measure' 
            || selector === 'documentMain' 
            || selector === 'weather_icon' 
            || selector === 'main_measure') continue;
            documentSelectors[selector].innerHTML = weatherThings[selector];
        }

        documentSelectors.weather_icon.setAttribute('src', weatherThings.weather_icon);

        let measure = 'C';

        function changeMeasure() {
            for (let i = 0; i < documentSelectors.measure.length; i++) {
                documentSelectors.measure[i].innerHTML = measure;
            }
            
            documentSelectors.main_measure.innerHTML = measure;
        }    

        changeMeasure();

        documentSelectors.main_measure.addEventListener('click', () => {
            if (measure === 'C') measure = 'F';
            else if (measure === 'F') measure = 'C';

            changeMeasure();
        });



    });

// User Story: I can see the weather in my current location.
// User Story: I can see a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.
// User Story: I can push a button to toggle between Fahrenheit and Celsius.
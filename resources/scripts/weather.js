// Ajax request for weather API
const weatherApi = 'https://weather-proxy.freecodecamp.rocks/api/current';

const requestWeather = async (arrayCoords) => {
    const [ latitude, longitude ] = arrayCoords;
    const endpoint = `${weatherApi}?lat=${latitude}&lon=${longitude}`;

    try {
        const response = await fetch(endpoint);

        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        } 
        else {
            throw new Error('Failed request');
        }
    } 
    catch(error) {
        console.log(error);
    }

}

export default requestWeather;
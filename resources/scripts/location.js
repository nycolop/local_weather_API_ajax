const location = () => {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                resolve([position.coords.latitude, position.coords.longitude]);
            });
        } 
        else {
            reject('This navigator doesn\'t support geolocation');
        }
    });
}

export default location;
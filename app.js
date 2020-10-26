const request = require('request');
const chalk = require('chalk');

const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + process.argv[2] + ".json?limit=1&access_token=pk.eyJ1Ijoic2hhcmFuayIsImEiOiJja2dxZWd6NTUwMHMyMzBreWMyeG9ibGlqIn0.e_e0U1tzKglQNrn4jX09sg"

// request from MAPBOX forward geocode
request({url: geocodeURL, json: true}, (error, response, body) => {

    if(error) {
        console.log(chalk.red.inverse("Sorry, Unable to connect to weather service..."));
    }else if(response.body.features.length === 0){
        console.log(chalk.red.inverse("Unable to find a loaction. Try another search :("));
    } else {
        const latitude = body.features[0].geometry.coordinates[1];
        const longitude = body.features[0].geometry.coordinates[0];
        const location = body.features[0].place_name;
    
        
        const weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=hourly,minutely&units=metric&cnt=1&appid=988ae15267a77da513d7a840511c135d';
    
        // request from OPEN WEATHER MAP
        request({url: weatherUrl, json: true}, (error, response, body) => {
            if(error){
                console.log(chalk.red.inverse("Sorry, Unable to connect to weather service..."));
            } else {
                console.log(chalk.blue(location)+"\n"+chalk.red(response.body.daily[0].weather[0].description+".") + "\nIt is currently " + chalk.blue.inverse(response.body.current.temp) + " degrees out. There feels like " + chalk.blue.inverse(response.body.current.feels_like) +" degrees");
            }
        })
    }

})








// request({url: url}, (error, response, body) => {
//     console.log(body);
//     const data = JSON.parse(response.body);
//     console.log(data);
// })


// Below we pass json to true. It will automatically parse the json to object
// request({url: url, json: true}, (error, response, body) => {
//     // console.log(response.body.current.temp);
//     console.log("It is currently " + response.body.current.temp + " degrees out. There feels like " + response.body.current.feels_like +" degrees");
// })


// // request from OPEN WEATHER MAP
// const weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=13.082680&lon=80.270721&exclude=hourly,minutely&units=metric&cnt=1&appid=988ae15267a77da513d7a840511c135d';

// request({url: weatherUrl, json: true}, (error, response, body) => {
//     console.log(response.body.daily[0].weather[0].description + ". It is currently " + response.body.current.temp + " degrees out. There feels like " + response.body.current.feels_like +" degrees");
// })








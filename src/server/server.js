const fetch = require("node-fetch");
const dotenv = require ('dotenv');
dotenv.config();
var APIusername = process.env. APIUSERNAME;//dianabetancourt
const apiKey= process.env. APIKEY;
let today = new Date(); 
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//https://api.weatherbit.io/v2.0/forecast/daily?&lat=38.123&lon=-78.543&key=8a2268cadd4140388570963ddbf02afc

//emty JS project to act as endpoint for all routes
const projectData = {};
// Express to run server and routes
const express= require('express');
// Start up an instance of app
const app = express();


/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require ('cors');
app.use(cors());
// get the info from the index file 
app.get('/all', function (req, res) {
    res.sendFile('src/client/views/index.html')
    
})
//look for the assets in the dist folder
app.use(express.static('dist'))

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('listening on port 8081!')
})

//axions instead of fetch
const axios = require('axios');
//post route
//Geonames API function definition
const getDataFromGeoNames= async (username,city)=>{
    const url=`http://api.geonames.org/searchJSON?q=${city}&maxRows=10&username=${username}`;
    try{
        return await axios.get(url)
                .then(res=>{
                    return {
                        lat:res.data.geonames[0].lat,
                        lng:res.data.geonames[0].lng 
                    }
                });
    } catch(error){
        console.log("error", error)
    }
}
//Get data from weather bit function definition
const getDataFromWeatherBit = async (lat, lng, key)=>{
    const url =`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lng}&key=${key}`;
    try{
        return await axios.get(url)
                .then(res=>{
                    console.log(res.data)
                    return {
                        high_temp: res.data.data[1].high_temp
                    }
                });
    } catch(error){
        console.log("error", error)
    }
}

const getHistoricalForecast = async (lat, lng, start_date, end_date, APIKEY) =>{
//if the trip is today or in the next 15 days retrieve the forecast else retrieve the historical weather data from the past
//https://api.weatherbit.io/v2.0/history/daily?&lat=38.123&lon=-78.543&start_date=2021-04-07&end_date=2021-04-08 
    const url ='https://api.weatherbit.io/v2.0/history/daily?&lat=${lat}&lon=${lng}&key=${key}'

}

//retrieving the user input that indicates the city
app.post('/addCity', function(req,res){
    let city=req.body.destination;
    let departureDate= req.body.departureDate;
    let returnDate = req.body.returnDate;
    //console.log(city);
   /* newEntry = {
        city:req.body.destination
    }
    projectData.newEntry = newEntry;
    res.send(newEntry); */

   //Geonames API function call 
    
    getDataFromGeoNames(APIusername,city)
    .then(apiResponse => {
        //res.json(apiResponse);
        console.log("api-response long:" + apiResponse.lng + " ,lat "+ apiResponse.lat)
   
        if (departureDate <= today.getDate()+16){
        getDataFromWeatherBit (apiResponse.lat,apiResponse.lng,apiKey)
            .then (weatherApiResponse => {
                console.log("api-response:" + weatherApiResponse.high_temp)
                res.json(weatherApiResponse);
        
                })
            }
        })

        getHistoricalForecast()
    
})

    //https://api.weatherbit.io/v2.0/forecast/daily?&lat=38.123&lon=-78.543&key=8a2268cadd4140388570963ddbf02afc


     /* getDataFromWeatherBit (apiResponse.lat,apiResponse.lng,apiKey).then(
        weatherApiResponse => {
            res.json(weatherApiResponse);
            console.log("api-response:" + weatherApiResponse)
            
        })*/


        
   


const fetch = require("node-fetch");
const dotenv = require ('dotenv');
dotenv.config();
let APIusername = process.env. APIUSERNAME;//dianabetancourt
const apiKey= process.env. APIKEY;//8a2268cadd4140388570963ddbf02afc
const pixabaykey = process.env. PIXABAYKEY;//21125444-62848c51ce09a8784479c70e0



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


//axios instead of fetch
const axios = require('axios');
const { response } = require("express");
const { ModuleFilenameHelpers } = require("webpack");
//post route
//Geonames API function definition
const getDataFromGeoNames= async (username,city)=>{
    const url=`http://api.geonames.org/searchJSON?q=${city}&maxRows=10&username=${username}`;
    try{
        return await axios.get(url)
                .then(res=>{
                    return {
                        lat:res.data.geonames[0].lat,
                        lng:res.data.geonames[0].lng,
                        countryName:res.data.geonames[0].countryName
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
                        data: res.data.data
                    }
                });
    } catch(error){
        console.log("error", error)
    }
}

const getCurrentWeather= async (lat, lng, key) =>{
//if the trip is today or in the next 15 days retrieve the forecast else retrieve the historical weather data from the past
//https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=8a2268cadd4140388570963ddbf02afc
    const url =`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${key}`;
    try{
        return await axios.get(url)
                .then(res=>{
                    //console.log("current weather::"+res.data)
                    return {
                        data: res.data.data
                    }
                });
    } catch(error){
        console.log("error", error)
        
    }
}

    const getPixabayPicture = async (city, key)=>{
        const res = await fetch(`https://pixabay.com/api/?key=${key}&q=${city}&image_type=photo`)
        try{
            let data=await res.json();
            //if pixabay does not find pictures that match the city show a picture of the country
            if(data.hits[1] == undefined || null){
                return getPixabayPicture ("travel", key);
            }
            const first_image = data.hits[1].webformatURL;
            console.log("first-image::" + first_image);
            
            return first_image;
        } catch(error){
            console.log("error", error)
        }
    }


    const getRestCountries = async (country)=>{
        const url = `https://restcountries.eu/rest/v2/name/${country}`;
        
        try{ return await axios.get(url)
        
                    .then(res=> {
                        console.log(res.data[0].name)
                        return {
                            
                            data:res.data
                        }
                    });
                }catch(error){
        console.log("error",error)
        }
    }

        
//retrieving the user input that indicates the city and the days left and sending api responses to the front-end
app.post('/addCity', function(req,res){
    let city = req.body.destination;
    let departureDate= req.body.departureDate;
    let returnDate = req.body.returnDate;
    let daysleft = req.body.daysleft;
    
    
     getDataFromGeoNames(APIusername,city)
        .then(apiResponse => {
        console.log("api-response long:" + apiResponse.lng + " ,lat "+ apiResponse.lat)
        projectData.apiResponse = apiResponse;


        getRestCountries(apiResponse.countryName)
        .then(restcountriesresponse =>{
            projectData.restcountriesresponse= restcountriesresponse;
        

        if (daysleft < 16){ 
             getDataFromWeatherBit (apiResponse.lat,apiResponse.lng,apiKey)
            .then(weatherApiResponse => {
                
        projectData.weatherApiResponse = weatherApiResponse;
        res.send(projectData);
      
             })
            
            }
            
            else getCurrentWeather (apiResponse.lat,apiResponse.lng,apiKey).then(currentweatherApiResponse => {
                projectData.currentweatherApiResponse = currentweatherApiResponse;

                res.send(projectData); 
            })
       

        })
    

    })
})     

   app.post('/addImage', async(req,res)=>{
       const city = req.body.destination;
       const img = await getPixabayPicture(city,pixabaykey);
       console.log(img);
       res.send({
           image: img
       });
       console.log(city);
   })
   
   

module.exports = app
        
   


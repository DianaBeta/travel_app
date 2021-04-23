const fetch = require("node-fetch");
const dotenv = require ('dotenv');
dotenv.config();
var APIusername = process.env. APIUSERNAME;//dianabetancourt
const apiKey= process.env. APIKEY;
const pixabaykey = process.env. PIXABAYKEY;
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
const { response } = require("express");
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
                    console.log(res.data)
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
            if(data.hits[0] == undefined || null){
                return getPixabayPicture ("travel", key);
            }
            const first_image = data.hits[0].webformatURL;
            console.log("first-image::" + first_image);
            
            return first_image;
        } catch(error){
            console.log("error", error)
        }
    }

        
//retrieving the user input that indicates the city
app.post('/addCity', function(req,res){
    let city = req.body.destination;
    let departureDate= req.body.departureDate;
    let returnDate = req.body.returnDate;
    let daysleft = req.body.daysleft;
    
    
         getDataFromGeoNames(APIusername,city)
        .then(apiResponse => {
        console.log("api-response long:" + apiResponse.lng + " ,lat "+ apiResponse.lat)
        projectData.apiResponse = apiResponse;

    
         getDataFromWeatherBit (apiResponse.lat,apiResponse.lng,apiKey)
            .then(weatherApiResponse => {
                /*for(const[key, value] of Object.entries(data)){
                    data[i].forEach(element => if (element === valid_date && value === departureDate){
                    console.log(weatherApiResponse.data[0].valid_date)
                }
            } */
               //console.log("high-temp:" + weatherApiResponse.data[daysleft].high_temp + "low temp::" + weatherApiResponse.data[daysleft].low_temp)
                //res.json(weatherApiResponse);
        projectData.weatherApiResponse = weatherApiResponse;
        
       /* app.post('/addImage', async(req,res)=>{
            const city = req.body.destination;
            const img = await getPixabayPicture(city,pixabaykey);
            res.send({
                image: img
            });
            console.log(city);
        }) */
        /* getPixabayPicture(city,pixabaykey)
        .then(pixabayresponse =>{
            if (parseInt(pixabayresponse.data.totalHits) > 0){
                 $.each(data.hits, function (i,hits){console.log(hit.pageURL); });
            {
                console.log('no hits');
              getPixabayPicture("travel",pixabaykey)
              .then(pixabaynohitsresponse =>{
                  projectData.pixabaynohitsresponse = pixabaynohitsresponse;
              })
            }
        
                 //res.send(pixabayresponse);
        projectData.pixabayresponse = pixabayresponse;   
                
            })*/
             res.send(projectData);
         //   }
          /*  else getCurrentWeather(apiResponse.lat,apiResponse.lng,apiKey)
            .then (_currentWeatherApiResponse => {
            console.log("api-response current weather:" + _currentweatherApiResponse.timezone)
                res.json(_currentweatherApiResponse);
                })
        
            }) */

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
   
    //https://api.weatherbit.io/v2.0/forecast/daily?&lat=38.123&lon=-78.543&key=8a2268cadd4140388570963ddbf02afc

    /*app.post('/addCity', function(req,res){ 
        let city = req.body.destination;    
    getPixabayPicture(city,pixabaykey)
    .then(pixabayresponse =>{
        console.log(pixabayresponse)
        res.json("pixa " + res.data[0].hits.previewURL);
    })
})*/

     /* getDataFromWeatherBit (apiResponse.lat,apiResponse.lng,apiKey).then(
        weatherApiResponse => {
            res.json(weatherApiResponse);
            console.log("api-response:" + weatherApiResponse)
            
        })*/


        
   


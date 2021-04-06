const fetch = require("node-fetch");
const dotenv = require ('dotenv');
dotenv.config();
var APIusername = process.env. APIUSERNAME;


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
//API call 
/*const getDataFromGeoNames= async (username,city)=>{
    const url=`http://api.geonames.org/searchJSON?q=${city}&maxRows=10&=${username}`;
//http://api.geonames.org/search?q=london&maxRows=10&username=dianabetancourt
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
*/

app.post('/addCity', function(req,res){
    let data =req.body.destination;
    newEntry = {
        city:req.body.destination
    }
    projectData.newEntry = newEntry;
    console.log(projectData)
    res.send(projectData);
    
})


/*getDataFromGeoNames(APIusername,req.body.destination).then(
    apiResponse => {
    console.log(apiResponse)
    res.json(apiResponse);
    });
})*/
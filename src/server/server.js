


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
app.get('/', function (req, res) {
    res.sendFile('src/client/views/index.html')
    
})
//look for the assets in the dist folder
app.use(express.static('dist'))

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
                   
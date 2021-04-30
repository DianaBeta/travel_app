
# <h1>Travel app- Capstone project for Udacity's Front-End Web developer nanodegree Program</h1> 
<br>

<h2>Project goal and summary</h2>
This project's goal was to develop a travel app in which the user types a desired travel location(a city) and a date of departure. If the day of departure is in the next 16 days the user gets a predicted weather forecast and if its after he/she will get the current weather displayed in °C an an icon matching the description of the weather. The user will also see in which country is the city that he/she chose and which currency do they use. The user is able to save and delete the trips from the Front-End.

This information is retrieved from three APIs

<h2> Development procedure</h2>
The project uses an Express server to store the data from the app. GET and POST routes are used to communicate with the app.

The APIs used where the following:

 * [GeoNames](https://www.geonames.org/login)
 * [Weatherbit.io](https://www.weatherbit.io/)
 * [restcountries.eu](https://restcountries.eu/)
 * [Pixabay API](https://pixabay.com/service/about/api/)
 
  
  Also, webpack is used as a module bundler. 
  
  <h3>Layout and media</h4>
  
  * The app ayout is built with [Bootstrap](https://getbootstrap.com/). 
  * The weather icons were downloaded from Weatherbit.io
  * The images are retrieved from [Pixabay](https://pixabay.com/service/about/api/)
  
  
  <h4>Installation</h4>
  You need to install node.js on your machine. 
  Use npm install to install the required packages on your machine. 
  
  <h5>Get API keys</h5>
  
 * [GeoNames](https://www.geonames.org/login)
 * [Weatherbit.io](https://www.weatherbit.io/)
 * [restcountries.eu](https://restcountries.eu/) note: restcountries. eu api does not need a key.
 * [Pixabay API](https://pixabay.com/service/about/api/)
   
  
  <h5> Create an account in each of the APIs websites and add them to the files. </h5>
  1. npm run build-dev
  2. npm run build-prod
  3. npm start
  

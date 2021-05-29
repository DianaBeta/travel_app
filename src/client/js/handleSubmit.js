

//This function posts the user input to the server and then receives the response and updates the UI with this response
function handleSubmit(event){
 event.preventDefault()
 const tripData = {};
  
 let apicallnumber = 0;
  //user input about city of destination that will be sent to server and form validator
 let destination = document.getElementById('destination').value;
  if (Client.formValidator(destination) == false){
    return;
  }
 //user input about the date of departure
  let departureDate = new Date(document.getElementById('date').value);

 let today = new Date(); 
 let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();     
 
 let one_day= 1000 * 60 *60 *24;
 let difference_ms= ((departureDate.getTime())-(today.getTime()));

//function that calculates how many dates are left for the trip
 let  daysleft = Math.abs((Math.ceil(difference_ms/one_day)));





//function that posts the data to the server and receives the input
postData('http://localhost:8081/addCity', {destination: destination, departureDate: departureDate, daysleft: daysleft}).then(
  function(res){
    if (daysleft === 0){
      document.getElementById('information').innerHTML= "Your trip is today! better start packing!";
      updateUIweatherPrediction()    
     }
      else if
        (daysleft === 1) {
          document.getElementById('information').innerHTML= "Your trip is tomorrow! better start packing!";
         updateUIweatherPrediction()
          
       }
     
       else if 
       (daysleft < 16) {
        document.getElementById('information').innerHTML="Your trip is in "+ daysleft + " days";  
        updateUIweatherPrediction()
         }

        else if (daysleft > 16 || daysleft === 16) {
          updateUIcurrentWeather()
          document.getElementById('information').innerHTML="Your trip is in "+ daysleft + " days";
          }
   
    function updateUIweatherPrediction(){
  
      document.getElementById('city').innerHTML = destination.bold();
      document.getElementById('city').style.fontSize = "30px";
      document.getElementById('country').innerHTML= res.apiResponse.countryName;
      document.getElementById('temperature').style.fontSize = "25px";
      document.getElementById('typicalweather').innerHTML= "Predicted weather:";
      document.getElementById('temperature').innerHTML= res.weatherApiResponse.data[daysleft].temp + "°C";
      document.getElementById('description').innerHTML= res.weatherApiResponse.data[daysleft].weather.description;
      document.getElementById('countryInfo').innerHTML= `Currency of your destination: ${res.restcountriesresponse.data[0].currencies[0].name}`;
      document.getElementById('icon').innerHTML= `<img src="../src/client/media/icons/${res.weatherApiResponse.data[daysleft].weather.icon}.png" height=80px width=80px>`;
      document.getElementById('save').innerHTML= `<img src="../src/client/media/img/heart.png " width=15px height= 15px >${" Save trip "}`;
      const resultsHolder= document.querySelector(".results");
      resultsHolder.classList.remove("invisible");
                
      return;
    }
    
    function updateUIcurrentWeather(){
      document.getElementById('information').innerHTML=`Your trip is in ${daysleft} ${"days"}`;
      document.getElementById('city').innerHTML = destination.bold();
      document.getElementById('city').style.fontSize = "30px";
      document.getElementById('country').innerHTML= res.apiResponse.countryName;
      document.getElementById('typicalweather').innerHTML= "Current weather:";
      document.getElementById('temperature').style.fontSize = "25px";
      document.getElementById('temperature').innerHTML= res.currentweatherApiResponse.data[0].temp + "°C";
      document.getElementById('description').innerHTML= res.currentweatherApiResponse.data[0].weather.description;
      document.getElementById('icon').innerHTML= `<img src="https://www.weatherbit.io/static/img/icons/${res.currentweatherApiResponse.data[0].weather.icon}.png" width=15px height= 15px >${" Save trip" }`;
      //`<img src="../src/client/media/icons/${res.currentweatherApiResponse.data[0].weather.icon}.png" height=80px width=80px>`;
      document.getElementById('save').innerHTML= `${" Save trip" }`;
      //`<img src="../src/client/media/img/heart.png " width=15px height= 15px >
      document.getElementById('countryInfo').innerHTML=` Currency of your destination: ${res.restcountriesresponse.data[0].currencies[0].name}`;
      const resultsHolder= document.querySelector(".results");
      resultsHolder.classList.remove("invisible");
      return;
    }
          }

          

   )

   post('http://localhost:8081/addImage',{destination:destination})
.then(function (res){
  document.getElementById('image').setAttribute('src', res.image);
  document.getElementById('image').style.width = "50vh";
  document.getElementById('image').style.height = "auto";
  document.getElementById('image').style.borderRadius = "2px"
  
  tripData.image = res.image;
  apicallnumber ++;
  console.log("apicallnumber::" + apicallnumber);
    }

  )
  
}

// this function is called when the user clicks the button that says save trip
function addToPastTrip(){
  const savedTrips = document.querySelector('.past-trips');
  savedTrips.classList.remove('displaynone')
  const newdiv = document.createElement('div');
  newdiv.classList.add('card');
  savedTrips.appendChild(newdiv);
  const newdiv2 = document.createElement('div');
  newdiv2.classList.add('card-body');
  newdiv.appendChild(newdiv2);
  const deleteTrip = document.createElement('div');
  deleteTrip.classList.add('btn','btn-light','row-sm', 'card-footer', 'delete');
  newdiv.appendChild(deleteTrip);
  deleteTrip.innerHTML= "Remove trip";
  
  
  newdiv2.innerHTML = document.querySelector(".big-card").innerHTML;

  
  deleteTrip.addEventListener("click", () => {
    newdiv.remove();
  });
}

    
const post = async ( url = '', data = {})=>{
  console.log(data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
   // Body data type must match "Content-Type" header        
    body: JSON.stringify(data), 
  });

    try {
      const image = await response.json();
      console.log(image);//image
      return image;
    }catch(error) {
      console.log("error", error);
    }
  }


const postData = async ( url = '', data = {})=>{
  console.log(data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
   // Body data type must match "Content-Type" header        
    body: JSON.stringify(data), 
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
      console.log("error", error);
    }
  }

export { handleSubmit } 
 
export{ addToPastTrip}




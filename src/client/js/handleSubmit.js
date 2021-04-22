const tripData = [];
function handleSubmit(event){
 event.preventDefault()
 
 let destination = document.getElementById('destination').value;
 let departureDate = new Date(document.getElementById('date').value);
 //let returnDate = new Date(document.getElementById('return-date').value);
 let today = new Date(); 
 let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();     
 
 var one_day= 1000 * 60 *60 *24;
 let difference_ms= ((departureDate.getTime())-(today.getTime()));
 console.log("difference ms:"+ difference_ms);

 var  daysleft = Math.round(difference_ms/one_day);
 daysleft = daysleft + 1;



//Todo: if the trip is after 16 days alert




postData('http://localhost:8081/addCity', {destination: destination, departureDate: departureDate, daysleft: daysleft}).then(
  function(res){
  

       
        if (daysleft === 0){
          document.getElementById('information').innerHTML= "Your trip is today! better start packing!";
         }
          else if
            (daysleft === 1) {
              document.getElementById('information').innerHTML= "Your trip is tomorrow! better start packing!";
           }
         
           else if 
           (daysleft > 1 && daysleft < 16) {
            document.getElementById('information').innerHTML= "Your trip is in " + daysleft + " days";
             }
           else if 
           (daysleft <= -1) {
            document.querySelector(".beforetoday").classList.remove("displaynone");
            
             }

            else if (daysleft > 16) {
              
              document.querySelector(".toofar").classList.remove("displaynone");
           
          
              }
           
        "Your trip is in "+ daysleft + " days";
        document.getElementById('city').innerHTML = destination.bold();
        document.getElementById('city').style.fontSize = "30px";
        document.getElementById('temperature').innerHTML= res.weatherApiResponse.data[daysleft].temp + "°C";
        document.getElementById('temperature').style.fontSize = "25px";
        document.getElementById('description').innerHTML= res.weatherApiResponse.data[daysleft].weather.description;
        document.getElementById('icon').innerHTML= `<img src="src/client/media/icons/${res.weatherApiResponse.data[daysleft].weather.icon}.png" height=80px width=80px>`;
        document.getElementById('save').innerHTML= `<img src="src/client/media/img/heart.png " width=15px height= 15px >`+" Save trip ";
        //document.getElementById('image').innerHTML.setAttribute('src', res.pixabayresponse.data.hits[0].webformatURL);
        //`<img src="src/client/media/icons/${res.weatherApiResponse.data[daysleft].weather.icon}.png" height=50px width=50px>
        const resultsHolder= document.querySelector(".results");
       resultsHolder.classList.remove("invisible");

      tripData.push(destination);
      tripData.push(res.weatherApiResponse.data[daysleft].temp + "°C");
      tripData.push(res.weatherApiResponse.data[daysleft].weather.description);
      tripData.push(`<img src="src/client/media/icons/${res.weatherApiResponse.data[daysleft].weather.icon}.png" height=80px width=80px>`);
      console.log("trip-data"+tripData);
          }
   )

   post('http://localhost:8081/addImage',{destination:destination})
.then(function (res){
  document.getElementById('image').setAttribute('src', res.image);
  document.getElementById('image').style.width = "400px";
  document.getElementById('image').style.borderRadius = "2px"
  
  tripData.push(res.image);
    }

  )
  
}

function addToPastTrip(){
  /*const savedTrips = document.querySelector('.past-trips');
  savedTrips.classList.add('card');
  savedTrips.classList.add('col');
  const newdiv = document.createElement('div');
  savedTrips.appendChild(newdiv);
  newdiv.classList.add('card-body');*/
const savedTrips = document.querySelector('.past-trips');
savedTrips.classList.remove('displaynone');
document.getElementById('city2').innerHTML = tripData[1];
document.getElementById('city2').style.fontSize = "30px";
document.getElementById('temperature2').innerHTML= tripData[2];
document.getElementById('temperature2').style.fontSize = "25px";
document.getElementById('description2').innerHTML= tripData[3];
document.getElementById('icon2').innerHTML= tripData[4];
document.getElementById('image2').setAttribute('src', tripData[0]);
document.getElementById('image2').style.width = "300px";
//document.getElementById('save2').innerHTML= `<img src="src/client/media/img/heart.png " width=15px height= 15px >`+" Save trip ";

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
      console.log(newData);//Data from api
      return newData;
    }catch(error) {
      console.log("error", error);
    }
  }

export { handleSubmit } 
 
export{ addToPastTrip}


//weatherbit api: iterate through data object and iterate into each of the 16 arrays comparing if the departure date and the valid date match. 
//If yes then return the low and max_temp.

//pixabay api: check if there are hits for a particular city, if yes then go to the first array and display the picture 
//of the first url if not then make another api call but with the country name and repeat process.
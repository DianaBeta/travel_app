
function handleSubmit(event){
 event.preventDefault()
 
 let destination = document.getElementById('destination').value;
 let departureDate = new Date(document.getElementById('date').value);
 let returnDate = new Date(document.getElementById('return-date').value);
 let today = new Date(); 
 let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();     
 
 var one_day= 1000 * 60 *60 *24;
 let difference_ms= ((departureDate.getTime())-(today.getTime()));

 var  daysleft = Math.round(difference_ms/one_day) + 1;
 if (daysleft === 0){
 console.log("Your trip is today! better start packing!");
}
 else if
   (daysleft === 1) {
   console.log("Your trip is tomorrow! better start packing!");
  }

  else if 
  (daysleft > 1) {
     console.log("Your trip is in " + daysleft + "days");
    }
  else if 
  (daysleft <= -1) {
     alert("The day of departure must be  today or after");
    }




postData('http://localhost:8081/addCity', {destination: destination, departureDate: departureDate, returnDate: returnDate, daysleft: daysleft}).then(
  function(res){
        document.getElementById('city').innerHTML = destination;
        document.getElementById('temperature').innerHTML= res.weatherApiResponse.data[daysleft].high_temp;
        //document.getElementById('image').innerHTML.setAttribute('src', res.pixabayresponse.data.hits[0].webformatURL);

      }
   )
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

//weatherbit api: iterate through data object and iterate into each of the 16 arrays comparing if the departure date and the valid date match. 
//If yes then return the low and max_temp.

//pixabay api: check if there are hits for a particular city, if yes then go to the first array and display the picture 
//of the first url if not then make another api call but with the country name and repeat process.
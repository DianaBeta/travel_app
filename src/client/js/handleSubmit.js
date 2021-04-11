function handleSubmit(event){
 event.preventDefault()
 
 let destination = document.getElementById('destination').value;
 let departureDate = document.getElementById('date').value;
 let returnDate = document.getElementById('return-date').value;
 let today = new Date(); 
      
postData('http://localhost:8081/addCity', {destination: destination, departureDate: departureDate, returnDate: returnDate})
    
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
      console.log(newData);//weather data from weatherbit
      return newData;
    }catch(error) {
      console.log("error", error);
    }
  }

export { handleSubmit } 


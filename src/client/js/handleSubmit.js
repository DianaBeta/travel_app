function handleSubmit(event){
 event.preventDefault()
 
 let destination = document.getElementById('destination').value;
 let date = document.getElementById('date').value;

      
postData('http://localhost:8081/addCity', {destination: destination})
    
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
      console.log(newData);
      return newData;
    }catch(error) {
      console.log("error", error);
    }
  }

export { handleSubmit } 


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/CarLists.css';
import Groq from 'groq-sdk';
import {Link} from 'react-router-dom'


const CarLists = () => {
  const [cars, setCars] = useState([]);
  const [filterCar,seFilterCars]=useState([])
  const [error, setError] = useState("");
  const [searchParam,setSearchParam]=useState("");
  const [aiFilter,setAiFilter]=useState([])
  const apikey="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";
  const handleSearchParam=(e)=>{
    let s=e.target.value
      setSearchParam(s)
      if(s.trim().length==0){
        seFilterCars(cars)
      }
  }
  const handleEmailSending = async (ownerEmail,car) => {
    console.log("Sending email to:", ownerEmail);
    const user=JSON.parse(localStorage.getItem("user"))
  
    try {
      const response = await axios.post("http://localhost:4000/mail-to-owner", {
        email: ownerEmail, 
        user:user,
        car
      });
  
      console.log("Email sent successfully:", response.data);
    } catch (e) {
      console.log("Error occurred:", e.message); 
    }
  };
  const handleSearching=(cars)=>{
    if (searchParam.trim() !== '') {
      const filtered = cars.filter((car) =>{
        const carString = Object.values(car)
          .map((value) => (typeof value === 'string' ? value : String(value)))
          .join(' ')
          .toLowerCase()
          .trim();
        return carString.includes(searchParam.toLowerCase().trim());
      });
      seFilterCars(filtered);
    } else {
      seFilterCars(cars);
    }
  }
  const handleAiSearching=(cars)=>{
   fetFilterRequirementsFromAi(cars)
   let length=aiFilter.length 
   let aiFilterCars=new Set()
   for(let i=0;i<length;i++){
  aiFilterCars.add(cars[aiFilter[i].id])
   }
   seFilterCars(aiFilterCars)


  }
  
    const fetFilterRequirementsFromAi=async(cars)=>{
      const carStringArray = [];
      cars.forEach(car => {
          let s = `car name=${car.name}, car brand=${car.brand}, car price=${car.pricePerDay}, seat capacity=${car.seatCapacity}, fuel type=${car.fuelType}`;
          carStringArray.push(s);
      });
      
    try {
      const groq = new Groq({ apiKey: apikey, dangerouslyAllowBrowser: true });
     
      const chatCompletion = await groq.chat.completions.create({
        "messages": [
          {
            role: "user",
            content: ` 
            Extract the requirements from ${searchParam} and validate them against standard car attributes such as year, rent per day, seat capacity, fuel type, color, and location.

Given the available car list ${carStringArray}, determine which cars best match the specified requirements. Provide the results in a structured JSON format as a list of objects, where each object contains the id of a suitable car and the reason for selection.

Ensure that each id belongs to a car from the available list. The output format should be:

[
  {"id": "11", "reason": "Lowest cost"},
  {"id": "25", "reason": "Highest seat capacity"},
  {"id": "8", "reason": "Best fuel efficiency"}
] dont give extra data if found sutiale give or else give empty array []
    `
          }
        ],
       "model": "llama-3.3-70b-versatile",
    "temperature": 1,
    "max_completion_tokens": 1024,
    "top_p": 1,
    "stream": true,
    "stop": null
      });

      let accumulatedContent = '';
      for await (const chunk of chatCompletion) {
        const questionContent = chunk.choices[0]?.delta?.content || '';
        accumulatedContent += questionContent;
      } 

      //console.log(accumulatedContent)
      const jsonStartIndex = accumulatedContent.indexOf("[");
      const jsonEndIndex = accumulatedContent.lastIndexOf("]")+1 ;
      const jsonString = accumulatedContent.substring(jsonStartIndex, jsonEndIndex);
      alert(jsonString)
      if (jsonString) {
        const parsedQuestions =[]
        let l=jsonString.length
        let newjs=jsonString.slice(1,l)
        let newC=jsonString.split(",")
        setAiFilter(newC)
        sessionStorage.setItem("interview-questions", JSON.stringify(parsedQuestions));
      }
      alert(aiFilter)
      
    } catch (error) {
      console.error("Error fetching questions:", error);
    } 
  };


  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:4000/all-cars");
        setCars(response.data.data || []); 
        seFilterCars(response.data.data)
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("Failed to fetch cars. Please try again later.");
      }
    };

    fetchCars();
  }, []);
  const Styles={
    searchContainer:{
     display:"flex",
     justifyContent:"Center",
     alignItems:"center",
     width:"100%",
     height:"40px",
     gap:"3px",
     margin:"5px",
     color:"black",

    },
    input:{
      backgroundColor:"white",
      width:"75%",
      padding:"5px",
      borderRadius:"10px"
    },
    searchButton:{
      width:"10%",
      backgroundColor:"blue",
      borderRadius:"10px",
      padding:"5px"
    },
    searchAiButton:{
      width:"10%",
      backgroundColor:"green",
      borderRadius:"10px",
      padding:"5px",
      display:"none"
    }
  
  }
  
  
  return (
    <div className="car-list-container" style={{marginTop:"10px"}}>
       <div className='searchContainer' style={Styles.searchContainer}>
            <input style={Styles.input} type="text" placeholder='enter car name or  your requirements' value={searchParam} onChange={handleSearchParam}/>
            <button style={Styles.searchButton} id='searchIcon' title='Search' onClick={()=>handleSearching(cars)}>search</button>
            <button style={Styles.searchAiButton} id='askAi' title='ask AI' onClick={()=>handleAiSearching(cars)}>ask AI</button>
          </div>
      {error ? (
        <p className="error-message">{error}</p>
      ) : filterCar.length > 0 ? (
        <div>
        <div className="car-grid">
          {filterCar.map((car, index) => (
            <div key={car._id} className="car-item">
             
              <img 
                src={`data:image/jpeg;base64,${car.image}`} 
                alt={car.name} 
                className="car-image" 
              />
              <div className="car-details" style={{background: "linear-gradient(90deg, #ff7e5f, #feb47b)"}}>
                <h3 className="car-brand">{car.brand}</h3>
                <p className="car-name">{car.name}</p>
                <p className="car-price">Price Per Day: ₹{car.pricePerDay}</p>
                <Link to={`/car/${car._id}`}><button className="car-button" onClick={()=>handleEmailSending(car.ownerEmail,car)}>View Details</button></Link>
              </div>
            </div>
          ))}
        </div>
        </div>
      ) : (
        <p className="no-data-message">No cars available to display.</p>
      )}
    </div>
  );
};
export default CarLists;

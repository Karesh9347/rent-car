import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CarDetails = () => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: carId } = useParams();

  useEffect(() => {
    
    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/get-car/${carId}`);
        setCar(response.data);
      } catch (err) {
        console.error("Error fetching car:", err);
        setError("Failed to fetch car details.");
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [carId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!car) return <div>Car not found.</div>;
  return (
    <div style={styles.container}>
      
      <div style={styles.card}>
        <img
          src={`data:image/jpeg;base64,${car.image}`}
          alt="Car"
          style={styles.image}
        />
      </div>

      <div style={styles.details}>
        <div style={styles.info}>
        <h2 style={styles.title}>{`${car.brand} ${car.name}`}</h2>
        <p><strong>💲 Price per Day:</strong> ${car.pricePerDay}</p>
        <p><strong>⚙ Transmission:</strong> {car.transmissionType}</p>
        <p><strong>📅 Year:</strong> {car.yearModel}</p>
        <p><strong>🛑 Seats:</strong> {car.seatCapacity}</p>
        <p><strong>⛽ Fuel:</strong> {car.fuelType}</p>
        <p><strong>🎨 Color:</strong> {car.color}</p>
        <p><strong>📍 Location:</strong> {car.location}</p>
        <p><strong>📞 Contact:</strong> {car.mobileNumber}</p>
        
        </div>
        <div style={styles.buttonContainer}>
          <a href={`mailto:${car.email}`} style={styles.buttonMail}>📧 Mail Now</a>
          <a href={`tel:${car.mobileNumber}`} style={styles.buttonCall}>📞 Call Now</a>
        </div>
      </div>

      <style>{mediaQueries}</style>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "rgb(43, 38, 38)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      zIndex: 1000,
      width:"100%",
      height: "100vh",

  },
  card: {
    width: "70%",
    minWidth: "300px",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflow: "hidden",
    height: "100vh",
    
  },
  image: {
    width: "100%",
    height: "70%",
    objectFit: "cover",
    padding:"10px",
    borderRadius:"5%",
  },
  details: {
    width: "30%",
    minWidth: "300px",
    padding: "20px",
    height: "100%",
    borderRadius: "8px",
   
  },
  info:{
marginTop:"-40px",
  },
  title: {
    color: "blue",
    marginBottom: "15px",
    fontSize:"30px",
    textTransform:"capitalize",
    
    
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    bottom: 0,
  },
  buttonMail: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
  },
  buttonCall: {
    marginBottom:"0px",
    padding: "10px 15px",
    backgroundColor: "#28a745",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
  },
};

const mediaQueries = `
  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      align-items: center;
    }
    .card, .details {
      width: 100%;
    }
  }
`;

export default CarDetails;

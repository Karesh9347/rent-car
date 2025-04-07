import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CarLists from '../components/CarLists';
import Footer from '../components/Footer';

import Service from '../components/Service';
import Pagination from '../components/Pagination';
import axios from 'axios';
const Cars = () => {
  const [value, setValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); 
  const [carsPerPage] = useState(10); 
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:4000/all-cars");
        setCars(response.data.data || []); // Assuming response.data contains a `data` field with the cars
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("Failed to fetch cars. Please try again later.");
      }
    };

    fetchCars();
  }, []);
  const params = useParams();
  const rangeValue = params.rangeValue || 0; 

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar); 

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="w-full flex flex-col justify-between md:flex-row">
       
        <div className="w-full">
          <CarLists cars={currentCars} /> 
          <div className="flex justify-center items-center">
            <Pagination 
              currentPage={currentPage} 
              totalPages={Math.ceil(cars.length / carsPerPage)} 
              paginate={paginate} 
            />
          </div>
        </div>
      </div>
      <Service />
      <Footer />
    </>
  );
};

export default Cars;
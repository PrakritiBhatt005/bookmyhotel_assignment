import React, { useEffect, useState } from 'react';
import { getHotelDetails } from '../services/api';
// import './HotelPage.css';

const HotelPage = ({ hotelId }) => {
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      const data = await getHotelDetails(hotelId);
      setHotel(data);
    };
    fetchHotelDetails();
  }, [hotelId]);

  if (!hotel) return <div>Loading...</div>;

  return (
    <div className="hotel-page">
      <h1>{hotel.name}</h1>
      <p>{hotel.description}</p>
      <button>View Facilities</button>
      <button>Book Now</button>
    </div>
  );
};

export default HotelPage;
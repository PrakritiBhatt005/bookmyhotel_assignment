import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import ExploreHotels from './components/ExploreHotels';
import HotelPage from './components/HotelPage';
import BookingModal from './components/BookingModal';
import './styles/App.css';
import Navbar from './components/Navbar';

const App = () => {
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleSearch = (searchTerm, checkInDate, checkOutDate, persons) => {
    // Handle search logic
  };

  const handleViewHotel = (hotelId) => {
    setSelectedHotelId(hotelId);
  };

  const handleBookNow = (data) => {
    setBookingData(data);
    setIsBookingModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsBookingModalOpen(false);
  };

  return (
    <div className="App">
      <Navbar/>
      <HeroSection onSearch={handleSearch} />
      <ExploreHotels onViewHotel={handleViewHotel} />
      {selectedHotelId && <HotelPage hotelId={selectedHotelId} />}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseModal}
        initialData={bookingData}
      />
    </div>
  );
};

export default App;
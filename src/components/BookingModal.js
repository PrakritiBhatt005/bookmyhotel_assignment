import React, { useState } from 'react';
// import './BookingModal.css';

const BookingModal = ({ isOpen, onClose, initialData }) => {
  const [checkInDate, setCheckInDate] = useState(
    initialData?.checkInDate || ""
  );
  const [checkOutDate, setCheckOutDate] = useState(
    initialData?.checkOutDate || ""
  );
  const [persons, setPersons] = useState(initialData?.persons || 1);

  const handleBook = () => {
    alert('Booking successful!');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="booking-modal">
      <input
        type="date"
        value={checkInDate}
        onChange={(e) => setCheckInDate(e.target.value)}
      />
      <input
        type="date"
        value={checkOutDate}
        onChange={(e) => setCheckOutDate(e.target.value)}
      />
      <input
        type="number"
        value={persons}
        onChange={(e) => setPersons(e.target.value)}
        min="1"
      />
      <button onClick={handleBook}>Book</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default BookingModal;
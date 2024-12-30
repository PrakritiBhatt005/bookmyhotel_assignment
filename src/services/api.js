export const getHotelsList = async (page, size) => {
    const response = await fetch(`https://www.gocomet.com/api/assignment/hotels?page=${page}&size=${size}`);
    const data = await response.json();
    return data;
  };
  
  export const getHotelDetails = async (hotelId) => {
    const response = await fetch(`https://www.gocomet.com/api/assignment/hotels/${hotelId}`);
    const data = await response.json();
    return data;
  };
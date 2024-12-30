import React, { useEffect, useState } from "react";
import "./HeroSection.css";
import { getHotelsList } from "../services/api";

const HeroSection = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [persons, setPersons] = useState(1);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [hotels, setHotels] = useState([]); // Full hotel data from API
  const [filteredHotels, setFilteredHotels] = useState([]); // Filtered hotels
  const [filters, setFilters] = useState({
    priceRange: "",
    rating: [],
    city: [],
  });

  // Fetch hotel data on mount
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await getHotelsList(1, 10);
        setHotels(data.hotels || []);
        setFilteredHotels(data.hotels || []); // Initialize filtered hotels
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };
    fetchHotels();
  }, []);

  // Filter hotels whenever filters or searchTerm changes
  useEffect(() => {
    const applyFilters = () => {
      let updatedHotels = hotels;

      // Apply search term filter
      if (searchTerm) {
        updatedHotels = updatedHotels.filter((hotel) =>
          hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply price range filter
      if (filters.priceRange) {
        const [minPrice, maxPrice] = filters.priceRange.split("-").map(Number);
        updatedHotels = updatedHotels.filter((hotel) => {
          const price = parseInt(hotel.price.replace(/[^0-9]/g, ""));
          return price >= minPrice && price <= maxPrice;
        });
      }

      // Apply rating filter
      if (filters.rating.length > 0) {
        updatedHotels = updatedHotels.filter((hotel) =>
          filters.rating.includes(hotel.rating)
        );
      }

      // Apply city filter
      if (filters.city.length > 0) {
        updatedHotels = updatedHotels.filter((hotel) =>
          filters.city.includes(hotel.city)
        );
      }

      setFilteredHotels(updatedHotels);
    };

    applyFilters();
  }, [filters, searchTerm, hotels]);

  const handleFilterChange = (filterType, value) => {
    if (filterType === "rating" || filterType === "city") {
      const updatedFilter = filters[filterType].includes(value)
        ? filters[filterType].filter((item) => item !== value)
        : [...filters[filterType], value];
      setFilters({ ...filters, [filterType]: updatedFilter });
    } else {
      setFilters({ ...filters, [filterType]: value });
    }
  };

  const handleSearch = () => {
    if (searchTerm && checkInDate && checkOutDate && persons) {
      onSearch(searchTerm, checkInDate, checkOutDate, persons);
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <section className="hero">
      {/* Hero Section Content */}
      <h1>Find the Perfect deal, always.</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique
        officia non corrupti pariatur ```jsx aspernatur sint modi commodi cum
        possimus blanditiis facilis beatae repellendus.
      </p>
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsDropdownVisible(true)}
          onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
          placeholder="Type city, place, or hotel name"
        />
        <input
          className="date-input"
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
        />
        <input
          className="date-input"
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
        />
        <input
          className="persons-input"
          type="number"
          value={persons}
          onChange={(e) => setPersons(e.target.value)}
          min="1"
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {/* Dropdown Options */}
      {isDropdownVisible && (
        <ul className="options-list">
          {filteredHotels.map((hotel, index) => (
            <li key={index} onClick={() => setSearchTerm(hotel.name)}>
              {hotel.name}
            </li>
          ))}
        </ul>
      )}

      {/* Filters and Hotels Section */}
      <div className="main-content">
        {/* Filters Sidebar */}
        <aside className="filters">
          <h3>Filters</h3>
          {/* Price Range Filter */}
          <div className="filter-group">
            <h4>Price Range</h4>
            <div>
              <input
                type="radio"
                name="price"
                value="0-1000"
                onChange={(e) =>
                  handleFilterChange("priceRange", e.target.value)
                }
              />
              <label>Up to ₹1000</label>
            </div>
            <div>
              <input
                type="radio"
                name="price"
                value="1000-2000"
                onChange={(e) =>
                  handleFilterChange("priceRange", e.target.value)
                }
              />
              <label>₹1000 - ₹2000</label>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="filter-group">
            <h4>Rating</h4>
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star}>
                <input
                  type="checkbox"
                  value={star}
                  onChange={(e) => handleFilterChange("rating", e.target.value)}
                />
                <label>{star} Star</label>
              </div>
            ))}
          </div>

          {/* City Filter */}
          <div className="filter-group">
            <h4>City</h4>
            {["Mumbai", "Bangalore", "Delhi"].map((city) => (
              <div key={city}>
                <input
                  type="checkbox"
                  value={city}
                  onChange={(e) => handleFilterChange("city", e.target.value)}
                />
                <label>{city}</label>
              </div>
            ))}
          </div>
        </aside>

        {/* Hotel Cards */}
        <main className="hotel-grid">
          <h3>Explore Hotels</h3>
          <div className="grid">
            {filteredHotels.map((hotel, index) => (
              <div className="hotel-card" key={index}>
                <img src="/hotel.jpg" alt={hotel.name} />
                <h4>{hotel.name}</h4>
                <p>{hotel.price}</p>
                <button>View</button>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="pagination">
            <button>1</button>
            <button>2</button>
            <button>3</button>
          </div>
        </main>
      </div>
    </section>
  );
};

export default HeroSection;

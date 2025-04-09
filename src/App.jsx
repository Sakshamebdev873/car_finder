import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CarList from './components/CarList';
import Wishlist from './components/Wishlist';
import { mockCars } from './data/mockData';
import { FaRegMoon } from 'react-icons/fa';
import { IoSunnyOutline } from 'react-icons/io5';

function App() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  
  // Load wishlist directly from localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem('wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error('Failed to load wishlist from localStorage', err);
      return [];
    }
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    fuelType: '',
    seatingCapacity: '',
  });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const carsPerPage = 10;

  // Load mock data on mount
  useEffect(() => {
    setCars(mockCars);
    setFilteredCars(mockCars);
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Handle search and filtering
  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);

    const filtered = cars.filter((car) => {
      return (
        (!searchFilters.brand || car.brand.toLowerCase().includes(searchFilters.brand.toLowerCase())) &&
        (!searchFilters.minPrice || car.price >= parseInt(searchFilters.minPrice)) &&
        (!searchFilters.maxPrice || car.price <= parseInt(searchFilters.maxPrice)) &&
        (!searchFilters.fuelType || car.fuelType.toLowerCase() === searchFilters.fuelType.toLowerCase()) &&
        (!searchFilters.seatingCapacity || car.seatingCapacity === parseInt(searchFilters.seatingCapacity))
      );
    });

    setFilteredCars(filtered);
    setCurrentPage(1);
  };

  const toggleWishlist = (car) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === car.id);
      if (exists) {
        return prev.filter((item) => item.id !== car.id);
      } else {
        return [...prev, car];
      }
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Car Finder</h1>
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 rounded-lg bg-blue-500 flex items-center gap-2 hover:bg-blue-600"
          >
            {isDarkMode ? <IoSunnyOutline className="text-white" /> : <FaRegMoon className="text-black" />}
            <span className={isDarkMode ? 'text-white' : 'text-black'}>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
        </div>

        <SearchBar DarkMode={isDarkMode} onSearch={handleSearch} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="md:col-span-2">
            <CarList
              cars={filteredCars}
              currentPage={currentPage}
              carsPerPage={carsPerPage}
              setCurrentPage={setCurrentPage}
              wishlist={wishlist}
              DarkMode={isDarkMode}
              toggleWishlist={toggleWishlist}
            />
          </div>
          <div className="md:col-span-1">
            <Wishlist
              wishlist={wishlist}
              DarkMode={isDarkMode}
              toggleWishlist={toggleWishlist}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import CarList from './components/CarList'
import Wishlist from './components/Wishlist'
import { mockCars } from './data/mockData'
import { FaRegMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
function App() {
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    fuelType: '',
    seatingCapacity: ''
  })
  const [isDarkMode, setIsDarkMode] = useState(false)
  const carsPerPage = 10

  useEffect(() => {
    // Simulating API call with mock data
    setCars(mockCars)
    setFilteredCars(mockCars)

    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }
  }, [])

  useEffect(() => {
    // Save wishlist to localStorage whenever it changes
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const handleSearch = (searchFilters) => {
    setFilters(searchFilters)
    let filtered = cars.filter(car => {
      return (
        (!searchFilters.brand || car.brand.toLowerCase().includes(searchFilters.brand.toLowerCase())) &&
        (!searchFilters.minPrice || car.price >= parseInt(searchFilters.minPrice)) &&
        (!searchFilters.maxPrice || car.price <= parseInt(searchFilters.maxPrice)) &&
        (!searchFilters.fuelType || car.fuelType === searchFilters.fuelType) &&
        (!searchFilters.seatingCapacity || car.seatingCapacity === parseInt(searchFilters.seatingCapacity))
      )
    })
    setFilteredCars(filtered)
    setCurrentPage(1)
  }

  const toggleWishlist = (car) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.find(item => item.id === car.id)) {
        return prevWishlist.filter(item => item.id !== car.id)
      } else {
        return [...prevWishlist, car]
      }
    })
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Car Finder</h1>
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 rounded-lg bg-blue-500 text- flex  justify-center items-center gap-2  hover:bg-blue-600 transition-colors"
          >
            {isDarkMode ? <IoSunnyOutline /> : <FaRegMoon />}
            {isDarkMode ? <div className='text-white' >Light Mode</div> : <div className='text-black' >Dark Mode</div>}
          </button>
        </div>
        
        <SearchBar DarkMode={isDarkMode} onSearch={handleSearch} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <Wishlist wishlist={wishlist} DarkMode={isDarkMode} toggleWishlist={toggleWishlist} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
import { useState } from 'react'

function SearchBar({ onSearch, DarkMode }) {
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    fuelType: '',
    seatingCapacity: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(filters)
  }

  const fieldBase = `p-2 border rounded w-full transition-colors duration-200 focus:outline-none focus:ring-2`
  const darkField = `bg-[#4E4E4E] border-gray-400 text-white placeholder-gray-400 focus:ring-blue-400`
  const lightField = `bg-white border-gray-300 text-black placeholder-gray-500 focus:ring-blue-500`

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-6 rounded-lg mb-8 ${
        DarkMode
          ? 'bg-[#4e4e4e] shadow-[0px_2px_15px_2px_black] text-white'
          : 'bg-white shadow-lg text-black'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 mt-2 gap-4">
        {/* Brand Input */}
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={filters.brand}
          onChange={handleChange}
          className={`${fieldBase} ${DarkMode ? darkField : lightField}`}
        />

        {/* Min & Max Price Inputs */}
        <div className="flex gap-2">
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleChange}
            className={`${fieldBase} ${DarkMode ? darkField : lightField}`}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleChange}
            className={`${fieldBase} ${DarkMode ? darkField : lightField}`}
          />
        </div>

        {/* Fuel Type Select */}
        <select
          name="fuelType"
          value={filters.fuelType}
          onChange={handleChange}
          className={`${fieldBase} ${DarkMode ? darkField : lightField}`}
        >
          <option value="">Select Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        {/* Seating Capacity Select */}
        <select
          name="seatingCapacity"
          value={filters.seatingCapacity}
          onChange={handleChange}
          className={`${fieldBase} ${DarkMode ? darkField : lightField}`}
        >
          <option value="">Select Seating Capacity</option>
          {[2, 4, 5, 6, 7, 8].map(num => (
            <option key={num} value={num}>
              {num} Seats
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar

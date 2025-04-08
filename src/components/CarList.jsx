import CarCard from './CarCard'

function CarList({ cars, currentPage, carsPerPage, setCurrentPage, DarkMode, wishlist, toggleWishlist }) {
  const indexOfLastCar = currentPage * carsPerPage
  const indexOfFirstCar = indexOfLastCar - carsPerPage
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar)
  const totalPages = Math.ceil(cars.length / carsPerPage)

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentCars.map(car => (
          <CarCard
            key={car.id}
            car={car}
            DarkMode={DarkMode}
            isWishlisted={wishlist.some(item => item.id === car.id)}
            onWishlistToggle={() => toggleWishlist(car)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)}
            className={`px-4 py-2 rounded border transition-colors duration-150 ${
              currentPage === pageNum
                ? DarkMode
                  ? 'bg-[#4E4E4E] text-white border-gray-400'
                  : 'bg-gray-300 text-black border-gray-400'
                : DarkMode
                ? 'bg-transparent text-white border-gray-700 hover:bg-[#4E4E4E]'
                : 'bg-white text-black border-gray-300 hover:bg-gray-200'
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CarList

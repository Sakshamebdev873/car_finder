function CarCard({ car, isWishlisted, onWishlistToggle, DarkMode }) {
  return (
    <div
      className={`rounded-lg overflow-hidden transition-transform hover:scale-105 shadow-lg border ${
        DarkMode
          ? 'bg-[#4E4E4E] text-white border-gray-400'
          : 'bg-white text-black border-gray-200'
      }`}
    >
      <img
        src={car.image}
        alt={`${car.brand} ${car.model}`}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">
              {car.brand} {car.model}
            </h3>
            <p className={DarkMode ? 'text-gray-200' : 'text-gray-600'}>
              ${car.price.toLocaleString()}
            </p>
          </div>

          <button
            onClick={onWishlistToggle}
            className={`p-2 rounded-full ${
              isWishlisted
                ? 'text-red-500 hover:text-red-600'
                : DarkMode
                ? 'text-gray-200 hover:text-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            ❤️ WishList
          </button>
        </div>

        <div
          className={`mt-4 grid grid-cols-2 gap-2 text-sm ${
            DarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}
        >
          <div className="flex items-center gap-1">
            <span className="font-medium">Fuel:</span>
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Seats:</span>
            <span>{car.seatingCapacity}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Year:</span>
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Mileage:</span>
            <span>{car.mileage} km/l</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarCard

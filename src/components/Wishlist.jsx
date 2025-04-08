function Wishlist({ wishlist, toggleWishlist, DarkMode }) {
  return (
    <div
      className={`p-6 rounded-lg shadow-md ${
        DarkMode ? 'bg-[#4E4E4E] text-white border border-gray-400' : 'bg-white text-black'
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className={DarkMode ? 'text-gray-300' : 'text-gray-500'}>Your wishlist is empty</p>
      ) : (
        <div className="space-y-4">
          {wishlist.map(car => (
            <div
              key={car.id}
              className={`flex items-center justify-between p-3 rounded ${
                DarkMode
                  ? 'bg-[#4E4E4E] text-white border border-gray-500'
                  : 'bg-gray-50 text-black'
              }`}
            >
              <div>
                <h3 className="font-medium">{car.brand} {car.model}</h3>
                <p className={DarkMode ? 'text-gray-300 text-sm' : 'text-gray-600 text-sm'}>
                  ${car.price.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => toggleWishlist(car)}
                className="text-red-500 hover:text-red-600 text-xl"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist

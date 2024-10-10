const BookingInfo = ({data}) => {
  return (
    <div className="mt-10 bg-white px-4 pt-8 py-4 lg:mt-0">
      <p className="text-xl font-medium">Booking Summary</p>
      <p className="text-gray-400">
        Check your movie details and selected seats.
      </p>

      <p className="mt-8 text-lg font-medium">Selected Seats</p>
      <div className="mt-5 space-y-3">
        {data.seatList?.map((index, bookedSeat) => (
          <div key={index} className="flex justify-between text-sm">
            <span>Seat Number: {bookedSeat + 1}</span>
            <span>{data.ticketCost}₹</span>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-b py-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Subtotal</p>
          <p className="font-semibold text-gray-900">
            {" "}
            {data.seatList.length * data.ticketCost}₹
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Wallet Balance</p>
          <p className="font-semibold text-gray-900">{data.userData.wallet}₹</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">Total</p>
        <p className="text-2xl font-semibold text-gray-900">
          {data.seatList.length * data.ticketCost}₹
        </p>
      </div>
    </div>
  );
};

export default BookingInfo;

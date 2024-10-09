import React, { createContext, useState } from "react";

// 1. Create the context
const BookingContext = createContext({
  bookingInfo: {
    ticketCost: "",
    seat: "",
    seatList: [],
    movieDetails: "",
    userData: "",
  },
  setBookingInfo: () => {},
});

export const BookingProvider = ({ children }) => {
  // 2. State for booking info
  const [bookingInfo, setBookingInfo] = useState({
    ticketCost: "",
    seat: "",
    seatList: [],
    movieDetails: "",
    userData: "",
  });

  return (
    // 3. Provide the context to children components
    <BookingContext.Provider value={{ bookingInfo, setBookingInfo }}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;

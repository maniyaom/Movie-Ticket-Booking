import { useContext, useState } from "react";
import BookingInfo from "../components/BookingInfo"
import CardDetail from "../components/CardDetail"
import { useFirebase } from "../context/firebase"
import BookingContext from "../context/Booking";
import { useNavigate, useParams } from "react-router-dom";

const CheckOut=()=>{
    const firebase=useFirebase();
    const {movieId} = useParams();
    const [isLoading,setIsLoading]=useState(false)
    const navigate = useNavigate();
    const {bookingInfo,setBookingInfo}=useContext(BookingContext)

     const handlePayment = async () => {
       setIsLoading(true);
       const subtotal = bookingInfo.seatList.length * bookingInfo.ticketCost;
       //console.log(subtotal);
       try {
         await firebase.makePayment(
           Number(subtotal),
           bookingInfo.seat,
           bookingInfo.seatList,
           bookingInfo.movieDetails,
           bookingInfo.userData
         );
         alert(
           "Your tickets are booked successfully\nYou will be redirected to Your Tickets page"
         );
         navigate(`/MyTickets/${bookingInfo?.userData.uid}`);
       } catch (error) {
         alert("Transaction failed !!", error.message);
       } finally {
         setIsLoading(false);
       }
     };


    return(
        <div className="min-h-screen bg-white">
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <BookingInfo data={bookingInfo} />
        <CardDetail  handlePayment={handlePayment} isLoading={isLoading}/>
      </div>
    </div>
    )
}

export default CheckOut
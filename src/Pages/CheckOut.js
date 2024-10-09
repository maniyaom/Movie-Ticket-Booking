import BookingInfo from "../components/BookingInfo"
import CardDetail from "../components/CardDetail"

const CheckOut=()=>{
    return(
        <div className="min-h-screen bg-white">
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <BookingInfo />
        <CardDetail  />
      </div>
    </div>
    )
}

export default CheckOut
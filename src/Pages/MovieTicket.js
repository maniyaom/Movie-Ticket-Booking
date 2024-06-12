import "./MovieTicket.css";
import qrCode from "../assets/images/qr.png";
import { useFirebase } from "../context/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Component({ h1, c1, h2, c2 }) {
  return (
    <div className="row">
      <div className="wh">
        <h3>{h1}</h3>
        <p>{c1}</p>
      </div>
      <div className="wh">
        <h3>{h2}</h3>
        <p>{c2}</p>
      </div>
    </div>
  );
}

function MovieTicket() {

  const auth = getAuth();
  const firebase = useFirebase();
  const ticketId = useParams();
  const navigate = useNavigate();

  const [ticketData, setTicketData] = useState(null);
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    async function fetchTicketDetails() {
      try {
        const ticketDetails = await firebase.fetchTicketDetails(ticketId.ticketId);
        console.log(ticketDetails);
        setTicketData(ticketDetails);
      } catch (error) {
        console.error("Error fetching ticket details:", error);
      }
    }

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDetails = await firebase.fetchUserDetails(user.uid);
          setUserData(userDetails);
        }
        catch (error) {
          console.log("Error fetching user data : ", error);
        }
      } else {
        navigate('/Login');
      }
    });
  
    fetchTicketDetails();
  }, [ticketId]);

  if (!ticketData || !userData)
      return (
        <p>Loading...</p>
    )

  return (
    <div className="center">
      <div className="movieTicket">
        <h2>{ticketData.movieTitle}</h2>black
        <img
          src={qrCode}
          style={{ width: "12rem", height: "10rem", marginBottom: "0.5rem" }}
        ></img>
      </div>

      <Component h1="Name" c1={userData.name} h2="Email" c2={userData.email} />
      <Component h1="Seat No." c1={ticketData.bookedSeats.join(', ')} h2="Date" c2={ticketData.transactionTime} />
      <Component h1="Transaction Id" c1={ticketData.ticketId} h2="Cinema" c2={ticketData.theaterName} />
      <Component h1="Name" c1="rahul" h2="" c2="2" />
    </div>
  );
}

export default MovieTicket;
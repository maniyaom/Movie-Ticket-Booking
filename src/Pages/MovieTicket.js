import "./MovieTicket.css";
import { useFirebase } from "../context/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {QRCodeSVG} from 'qrcode.react';

function Ticket({ seat }) {
  return (
    <div className="movieTicket" style={{ flexDirection: "row" }}>
      <div className="" style={{ backgroundColor: "blue" }}>
        <p>{seat}</p>
      </div>
      <div>hh</div>
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
    console.log(ticketData);
    console.log(toString(ticketData));
    
    fetchTicketDetails();
  }, [ticketId]);

  if (!ticketData || !userData)
    return (
      <p>Loading</p>
    );

  else if (ticketData.paidBy != userData.uid) {
    return (
      <p>You cannot access this ticket</p>
    )
  }

  else if (ticketData && userData)
    return (
      <div className="center">
        <div className="movieTicket" style={{ justifyContent: "space-around" }}>
          <div
            style={{
              width: "27rem",
              height: "18rem",
              backgroundColor: "rgba(248, 68, 100, 1.0)",
              color: "white",
              borderRadius: "0.5rem",
            }}
          >
            <h2 className="margin">{ticketData.movieTitle}</h2>
            <p className="margin">{ticketData.theaterName} | {ticketData.theaterAddress}</p>
            <div
              className="cost margin"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Admin : </h3>
                <p>{(ticketData.subtotal * 0.70).toFixed(2)} ₹</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Service Charge: </h3>
                <p>{(ticketData.subtotal * 0.12).toFixed(2)} ₹</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>CGST @9%: </h3>
                <p>{(ticketData.subtotal * 0.09).toFixed(2)} ₹</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>SGST @9%:</h3>
                <p>{(ticketData.subtotal * 0.09).toFixed(2)} ₹</p>
              </div>
              <hr />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>subtotal: </h3>
                <p>{ticketData.subtotal} ₹</p>
              </div>
            </div>
          </div>
          <div className="center" style={{ width: '30rem' }}>
            <h3>Name : {userData.name}</h3>
            <h4>Email: {userData.email}</h4>
            <hr />
            <h4>Seat: {ticketData.bookedSeats.join(', ')}</h4>
            <hr />
            <h4>Time: {ticketData.movieTiming}</h4>
            <div>
            <QRCodeSVG value={JSON.stringify(ticketData.ticketId)}/>,
            </div>
          </div>
        </div>
      </div>
    );
}

export default MovieTicket;

import "./MovieTicket.css";
import qrCode from "../assets/images/qr.png";
import { useLocation } from "react-router-dom";

const temp = 111;

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
  const location = useLocation();

  return (
    <div className="center">
      <div className="movieTicket">
        <h2>Movie</h2>black
        <img
          src={qrCode}
          style={{ width: "12rem", height: "10rem", marginBottom: "0.5rem" }}
        ></img>
      </div>

      <Component h1="Name" c1={location.state.title} h2="Tickets" c2={location.state.bookedSeats} />
      <Component h1="Date" c1="rahul" h2="Cinema" c2={location.state.title} />
      <Component h1="Name" c1="rahul" h2="" c2="2" />
    </div>
  );
}

export default MovieTicket;
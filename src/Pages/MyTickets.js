import { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import { useNavigate, useParams } from "react-router-dom";

function MyTickets() {
    const firebase = useFirebase();
    const { uid } = useParams(); 
    const [ticketData, setTicketData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate=useNavigate();
    const handleNavigate=(ticketId)=>{
        navigate(`/MovieTicket/${ticketId}`)
    }
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                if (!uid) {
                    throw new Error("User ID is missing.");
                }
                const data = await firebase.fetchUserTickets(uid);
                if (Array.isArray(data)) {
                    setTicketData(data);
                } else {
                    setTicketData([]); 
                }
            } catch (err) {
                console.error("Error fetching user tickets:", err);
                setError("Failed to load tickets. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchTickets(); 
    }, [firebase, uid]); 

    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <p>Loading your tickets...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
                <p>{error}</p>
            </div>
        );
    }
    if (ticketData.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1 style={{ color: '#f84464', fontSize: '43px' }}>My Tickets</h1>
                <p>You have no tickets at the moment.</p>
            </div>
        );
    }
    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ color: '#f84464', textAlign: 'center', marginTop: '30px', fontSize: '43px' }}>My Tickets</h1>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {ticketData.map(ticket => (
                    <li key={ticket.ticketId} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', margin: '20px 0' }}>
                        <h2>{ticket.movieTitle}</h2>
                        <p><strong>Theater:</strong> {ticket.theaterName}</p>
                        <p><strong>Date & Time:</strong> {ticket.transactionTime}</p>
                        <p><strong>Seats:</strong> {ticket.bookedSeats.join(', ')}</p>
                        <p><strong>Subtotal:</strong> ₹{ticket.subtotal.toFixed(2)}</p>
                        <button style={{border:"none",backgroundColor:"#f84464",color:"white", padding:"5px 20px",marginTop:'10px'}} onClick={()=>handleNavigate(ticket.ticketId)}>View Ticket</button>
                       
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyTickets;

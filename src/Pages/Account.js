import React, { useEffect, useState } from 'react';
import './AboutUs.css';
import './Account.css';
import { useFirebase } from "../context/firebase";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const TransactionDetail = ({ ticketId, title, transactionId, bookedSeats, amount, date, color }) => (
    <Link to={`/MovieTicket/${ticketId}`} className="transaction-block" style={{ cursor: 'pointer', display: 'flex', marginBottom: '20px' }}>
        <div className="ticket-details">
            <div>{title}</div>
            <div>Seat No : {bookedSeats}</div>
            <div>txn Id: {transactionId}</div>
        </div>
        <div className={`amount ${color}`}>{amount}</div>
        <div className="date">{date}</div>
    </Link>
);

const Account = () => {

    const firebase = useFirebase();
    const auth = getAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [transactionData, setTransactionData] = useState(null);


    useEffect(() => {
        document.title = 'Your Account';
    }, []);


    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDetails = await firebase.fetchUserDetails(user.uid);
                const transactionDetails = await firebase.fetchTransactionDetails(user.uid);
                setUserData(userDetails);
                setTransactionData(transactionDetails);
                console.log(transactionDetails);
            } else {
                navigate('/Login');
            }
        });
    }, [auth])

    if (!userData || !transactionData)
        return <p>Loading...</p>

    return (
        <>
            <div>
                <h2 className="account-title">Account Details</h2>
                <div className="user-info" style={{ marginLeft: '10vw', marginTop: '5px' }}>
                    <div style={{ fontWeight: 600 }}>Name: {userData.name}</div>
                    <div style={{ fontWeight: 600 }}>Email: {userData.email}</div>
                    <div style={{ fontWeight: 600 }}>Phone Number: {userData.phone}</div>
                    <div style={{ fontWeight: 600 }}>Current Wallet Balance: {userData.wallet} ₹</div>
                </div>
                <div className="transaction-title">Transactions</div>

                <div className="transactions-block">
                    <div>
                        <div className="ticket-details" style={{ fontWeight: 600 }}>
                            Payment Details
                        </div>
                        <div className="amount" style={{ fontWeight: 600 }}>
                            Amount
                        </div>
                        <div className="date" style={{ fontWeight: 600 }}>
                            Date
                        </div>
                    </div>
                    {transactionData.map((transaction, index) => {
                        const { movieTitle, ticketId, bookedSeats, subtotal, paidBy, transactionTime } = transaction;

                        let amount = paidBy == userData.uid ? `- ${subtotal}` : `+ ${subtotal}`;
                        let color = paidBy == userData.uid ? 'color-red' : 'color-green';

                        return (
                            <TransactionDetail key={index} ticketId={ticketId} title={movieTitle} transactionId={ticketId} bookedSeats={bookedSeats.join(', ')} amount={amount} date={transactionTime} color={color} />
                        )
                    })}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Account;
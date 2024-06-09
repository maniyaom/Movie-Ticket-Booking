import React, { useEffect, useState } from 'react';
import './BookTicket.css'
import { useFirebase } from '../context/firebase';
import { useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const BookTicket = () => {
    const firebase = useFirebase();
    const auth = getAuth();
    const navigate = useNavigate();
    const movieId = useParams();

    const [movieDetails, setMovieData] = useState();

    const [seatsData, setSeatsData] = useState();
    const [seats, setSeats] = useState();
    const [seatList, setSeatList] = useState([]);
    const [ticketPrice, setTicketPrice] = useState();
    const [userData, setUserData] = useState();



    useEffect(() => {
        const getMovieData = async () => {
            try {
                const movieData = await firebase.fetchMovieDetails(movieId.movieId);
                setSeatsData(movieData.theaterSeats);
                setTicketPrice(movieData.ticketPrice);
                setMovieData(movieData);
                // console.log("Movie data : ", movieData);

                const initialSeats = movieData.theaterSeats.map(row => row.map(seat => seat == 1));
                // console.log(initialSeats);
                setSeats(initialSeats);
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };

        const getUser = async () => {
            onAuthStateChanged(auth, async (user) => {
                try {
                    if (user) {
                        const userDetails = await firebase.fetchUserDetails(user.uid);
                        setUserData(userDetails);
                    } else {
                        navigate('/Login');
                    }
                } catch (error) {
                    console.error('Error fetching user data.', error);
                }
            });
        }
        getUser();
        getMovieData();
    }, [auth]);

    function deepCopy(arr) {
        return arr.map(item => (typeof item === 'object' ? deepCopy(item) : item));
    }

    const handleSeatClick = (rowIndex, seatIndex) => {
        const tempSeats = deepCopy(seats);
        const seatNumber = rowIndex * 11 + seatIndex + 1;
        if (!seatsData[rowIndex][seatIndex]) {
            if (seats[rowIndex][seatIndex]) {
                tempSeats[rowIndex][seatIndex] = !tempSeats[rowIndex][seatIndex];
                setSeatList(seatList.filter(element => element !== seatNumber));
                // console.log(seatList.length)
            } else {
                tempSeats[rowIndex][seatIndex] = !tempSeats[rowIndex][seatIndex];
                setSeatList([...seatList, seatNumber]);
                // console.log(seatList.length)
            }
        }
        setSeats(tempSeats);
    };

    const getSeatClassName = (rowIndex, seatIndex) => {
        let className = 'seat';
        if (seatsData[rowIndex][seatIndex]) {
            className += ' not-available-seat';
        } else if (seats[rowIndex][seatIndex]) {
            className += ' your-seat';
        }
        return className;
    };

    const handlePayment = async () => {
        const subtotal = seatList.length * ticketPrice;
        
        if (userData.wallet >= subtotal) {
            const confirmation = await showConfirmationDialog(`${seatList}\nYour subtotal is ${subtotal}\nDo you want to continue?`);
            
            if (confirmation) {
                await firebase.updateData(`movies/${movieDetails.movieId}/theaterSeats`, seats);
                await firebase.updateData(`users/${userData.uid}/wallet`, userData.wallet - subtotal);
                
                const creatorData = await firebase.fetchUserDetails(movieDetails.creatorId);
                await firebase.updateData(`users/${movieDetails.creatorId}/wallet`, creatorData.wallet + subtotal);
                
                const updatedBalance = userData.wallet - subtotal;
                alert(`Your tickets are booked successfully\nYour updated balance is ${updatedBalance}`);
            } else {
                alert("Transaction cancelled.");
            }
        } else {
            alert("Insufficient balance. Please recharge your wallet.");
        }
    };
    
    const showConfirmationDialog = (message) => {
        return new Promise((resolve) => {
            // Replace this with your custom dialog implementation
            const confirmation = window.confirm(message);
            resolve(confirmation);
        });
    };
    
    

    if (!seatsData || !userData) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="col">
                {seatsData.map((row, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {row.map((seat, seatIndex) => (
                            <div
                                className={getSeatClassName(rowIndex, seatIndex)}
                                key={seatIndex}
                                id={`${rowIndex}-${seatIndex}`}
                                onClick={() => handleSeatClick(rowIndex, seatIndex)}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>

            <button
                onClick={handlePayment}>Make Payment</button>
        </>
    );
};

export default BookTicket;
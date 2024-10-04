import React, { useEffect, useState } from 'react';
import './BookTicket.css'
import { useFirebase } from '../context/firebase';
import { useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import '../components/Navbar.css';
import './utils.css';
import closeIcon from '../assets/icons/close-icon.png';
import loader_icon from '../assets/icons/loader_icon.gif';

const BookTicket = () => {
    const firebase = useFirebase();
    const auth = getAuth();
    const navigate = useNavigate();
    const movieId = useParams();

    const [showPopUp, setShowPopUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
        const seatNumber = rowIndex * 8 + seatIndex + 1;
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

    const handleProceedToPay = () => {
        if (seatList.length == 0)
            alert("Please select atleast one seat");
        else if (userData.wallet >= seatList.length * ticketPrice){
            setShowPopUp(true);
        }
        else
            alert("Insufficient Balance !! Please recharge your wallet.");
    }

    const handlePayment = async () => {
        setIsLoading(true);
        const subtotal = seatList.length * ticketPrice;
        try{
            await firebase.makePayment(subtotal, seats, seatList, movieDetails, userData);
            alert('Your tickets are booked successfully\nYou will be redirected to Your Tickets page');
            navigate(`/MyTickets/${userData.uid}`);
        }
        catch(error){
            alert("Transaction failed !!", error.message);
        }
        finally{
            setIsLoading(false);
        }
    };

    if (!seatsData || !userData) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className='movie'>
                <h2 style={{ fontSize: '28px', margin: '2px 20px' }}>{movieDetails.movieTitle}</h2>
                <p style={{ fontWeight: '500', margin: '6px 20px' }}>{movieDetails.theaterName} : {movieDetails.theaterAddress} | {movieDetails.movieReleaseDate} | {movieDetails.movieTiming}</p>
            </div>
            <div className='screen'>
                <svg>
                    <path d='M30 25 L25 30 L275 30 L270 25 Z' style={{ fill: 'aliceblue', stroke: 'lightblue' }} />
                    <path d='M25 30 L35 55 L265 55 L275 30 Z' style={{ fill: 'white', stroke: 'lightblue' }} />
                    <path d='M30 33 L37 52 L263 52 L270 33 Z' style={{ fill: 'lightblue' }} />
                </svg>
            </div>
            <div className='allSeats'>
                <div>
                    {seatsData.map((row, rowIndex) => (
                        <div className="row" key={rowIndex} style={{justifyContent: 'center'}}>
                            {row.map((seat, seatIndex) => (
                                <div
                                    className={getSeatClassName(rowIndex, seatIndex)}
                                    key={seatIndex}
                                    id={`${rowIndex}-${seatIndex}`}
                                    onClick={() => handleSeatClick(rowIndex, seatIndex)}
                                    style={{ display: 'flex', justifyContent: 'center' }}
                                >{(seatIndex + 1) + (rowIndex * 8)}</div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className='allSeats'>
                <button onClick={() => handleProceedToPay()} className='btn-primary' style={{marginBottom: '100px'}}>Proceed to Pay</button>
            </div>

            <div className='fixed-bottom'>
                <div className='footer'>
                    <div className='not-available-seat footer-button'></div>
                    <span style={{ color: 'black' }}>Not Available</span>
                    <div className='your-seat footer-button'></div>
                    <span style={{ color: 'black' }}>Selected</span>
                    <div className=' footer-button'></div>
                    <span style={{ color: 'black' }}>Available</span>
                    <div className='fixed-bottom'>
                        <div className='footer'>
                            <div className='not-available-seat footer-button'></div>
                            <span style={{ color: 'black' }}>Not Available</span>
                            <div className='your-seat footer-button'></div>
                            <span style={{ color: 'black' }}>Selected</span>
                            <div className=' footer-button'></div>
                            <span style={{ color: 'black' }}>Available</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={showPopUp ? 'checkout-card' : 'hide-element'}>
                <div className='flex justify-between'>
                    <div className="checkout-card-title">Booking Summary</div>
                    <img src={closeIcon} className='icon' onClick={() => setShowPopUp(false)} />
                </div>
                <div className="text-key-value">
                    <span>Ticket Price ( x 1 Ticket)</span>
                    <span className="values">{ticketPrice} ₹</span>
                </div>
                <div className="text-key-value">
                    <span>Wallet Balance</span>
                    <span className="values">{userData.wallet} ₹</span>
                </div>
                <div className="text-key-value">
                    <span>Total Payable Amount ({seatList.length} x Ticket) </span>
                    <span className="values">- {seatList.length * ticketPrice} ₹</span>
                </div>
                <div className="text-key-value">
                    <span>Remaining Balance</span>
                    <span className="values">{userData.wallet - seatList.length * ticketPrice} ₹</span>
                </div>
                <img src={loader_icon} className={isLoading ? 'loader' : 'hide-element'} />
                <button style={{ fontSize: '15px', margin: '5px 0px 20px calc((100% - 10rem)/2)' }} onClick={handlePayment} className='btn-primary'>
                    Make Payment
                </button>
            </div>
        </>
    );
};
export default BookTicket;
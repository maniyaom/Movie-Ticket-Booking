import React, { useEffect, useState } from 'react';
import './BookTicket.css'
import { useFirebase } from '../context/firebase';
import { useParams } from 'react-router-dom';

const BookTicket = () => {
    const firebase = useFirebase();
    const movieId = useParams();

    const [movieDetails, setMovieData] = useState();

    const [seatsData, setSeatsData] = useState();
    const [seats, setSeats] = useState();
    const [seatList, setSeatList] = useState([]);
    const [ticketPrice, setTicketPrice] = useState(200);
    const [totalPayableAmount, setTotalPayableAmount] = useState(0);

    useEffect(() => {
        const getMovieData = async () => {
            const movieData = await firebase.fetchMovieDetails(movieId.movieId);
            setSeatsData(movieData.theaterSeats);
            setMovieData(movieData);
            // console.log("Movie data : ", movieData.theaterSeats);

            const initialSeats = movieData.theaterSeats.map(row => row.map(seat => seat == 1));
            // console.log(initialSeats);
            setSeats(initialSeats);
        };
        getMovieData();
    }, []);

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
                setTotalPayableAmount(ticketPrice * seatList.length)
                // console.log(seatList.length)
            } else {
                tempSeats[rowIndex][seatIndex] = !tempSeats[rowIndex][seatIndex];
                setSeatList([...seatList, seatNumber]);
                setTotalPayableAmount(ticketPrice * seatList.length)
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
        // console.log("Handle payment : ", seats);
        alert('Seat Number : ' + seatList + ', Total : ' + ticketPrice*seatList.length);
        await firebase.updateData(`movies/${movieDetails.movieId}/theaterSeats`, seats);
    }

    if(!seatsData){
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
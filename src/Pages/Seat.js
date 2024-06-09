import React, { useState } from 'react';
import './Seat.css'

const seatsData = [
    [false, true, false, false, false, true, false, false, true, false, false],
    [false, true, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, true, false, false, false, false, true, false],
    [false, false, true, false, false, false, true, false, false, false, false],
    [false, true, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, true, false, false, true, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false]
];

const Seat = () => {
    const [seats, setSeats] = useState(seatsData);
    const [seatList, setSeatList] = useState([]);
    const [ticketPrice, setTicketPrice] = useState(200);
    const [totalPayableAmount, setTotalPayableAmount] = useState(0);

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
                console.log(seatList.length)
            } else {
                tempSeats[rowIndex][seatIndex] = !tempSeats[rowIndex][seatIndex];
                setSeatList([...seatList, seatNumber]);
                setTotalPayableAmount(ticketPrice * seatList.length)
                console.log(seatList.length)
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

    const handlePayment = () => {
        alert('Seat Number : ' + seatList + ', Total : ' + ticketPrice*seatList.length);
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

export default Seat;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './utils.css';
import './Verify.css';
import { useFirebase } from "../context/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Footer from '../components/Footer';
import { Html5QrcodeScanner } from "html5-qrcode";

const Verify = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const auth = getAuth();

    const [scanResult, setScanResult] = useState(false);
    const [ticketData, setTicketData] = useState(null);
    
    onAuthStateChanged(auth, (user) => {
        if (!user) {
          navigate("/Login")
        }
    });

    useEffect(() => {
        // Initialize the QR scanner
        let scanner = new Html5QrcodeScanner("reader", {
            fps: 5,
            qrbox: 250

        });

        scanner.render(onScanSuccess, onScanFailure);

        function onScanSuccess(result) {
            scanner.clear();
            setScanResult(result); // Set scan result
        }

        function onScanFailure(error) {
            console.warn(`Code scan error = ${error}`);
        }

        return () => {
            scanner.clear(); // Clean up scanner
        };
    }, []);

    useEffect(() => {
        if (scanResult) {
            handleResult();
        }
    }, [scanResult]);

    async function fetchTicketDetails(ticketId) {
        if (!ticketId) return; // Only fetch if ticketId is set

        try {
            const ticketDetails = await firebase.fetchTicketDetails(ticketId);
            if(ticketDetails?.ticketValidity) {
                updateTicketValidity(false, ticketId)
            } 
            setTicketData(ticketDetails)
        } catch (error) {
            console.error("Error fetching ticket details:", error);
        }
    }

    const updateTicketValidity = async (newValidity, ticketId) => {
    
        // Update in Firebase
        try { 
            const data = await firebase.updateData(`tickets/${ticketId}/ticketValidity`,  newValidity)
            console.log('Ticket validity updated in Firebase', data);
        } catch (error) {
            console.error('Error updating ticket validity in Firebase:', error);
        }
    };
    
    const handleResult = () => {
        try {
            const ticketId = JSON.parse(scanResult);
            fetchTicketDetails(ticketId)
            
        } catch (error) {
            console.error("Error parsing scan result:", error);
        }
    };
    
    return (
        <div>
    <div className="verify-ticket-container">
        <div className="verify-ticket">
            {scanResult ? (
                ticketData ? (
                    ticketData.ticketValidity ? (
                        <div style={{ color: "green" }}> This ticket is valid. Thank You for using Ticketify.</div>
                    ) : (
                        <div style={{color:"red"}}>Oops! This ticket has already been used.</div>
                    )
                ) : (
                    <div>Loading ticket data...</div> 
                )
            ) : (
                <div id="reader" style={{ width: "300px" }}></div>
            )}
        </div>
    </div>
    <Footer />
</div>

    );
};

export default Verify;

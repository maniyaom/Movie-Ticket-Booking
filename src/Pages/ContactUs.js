import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import loader_icon from "../assets/icons/loader_icon.gif";
import "./utils.css";
import "./AboutUs.css";
import Footer from "../components/Footer";

const ContactUs = () => {
  return (
    <>
    
      <div>
        <div className="p-10">
          <h1 className="text-[#f84464] text-4xl text-center mb-10">Contact Us</h1>
          <div className="flex justify-around">
          <div className="border-2 w-1/3 p-4 shadow-lg rounded-lg">
            <h1 className="text-sm text-[#f84464]">Thank you for choosing Ticketify! We're here to assist you with any
            questions or concerns you may have. Here's how you can get in touch
            with us:</h1>
                <form action="#" method="get" className="flex flex-col items-center justify-center gap-5 ">

                    
                   <div className="flex gap-4 mt-5 ">
                   <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        className="p-2 rounded-md border-2 border-[#fdb0be] outline-none w-[14vw]"
                        placeholder="Enter First Name"
                        required
                    />
                    
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        className="border-2 p-2 rounded-md  border-[#fdb0be] outline-none w-[14vw]"

                        placeholder="Enter Last Name"
                        required
                    />
                   </div>
                    
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="p-2 rounded-md w-[29vw] border-2 border-[#fdb0be] outline-none"
                        placeholder="Enter email"
                        required
                    />
                    
                    <input
                        type="tel"
                        name="contact"
                        id="contact"
                        className="border-2 p-2 rounded-md w-[29vw] border-[#fdb0be] outline-none"
                        placeholder="Enter Mobile number"
                        required
                    />
                   
                   
                    
                    <textarea
                        name="about"
                        id="about"
                        cols="50"
                        rows="10"
                        className="border-2 p-2 rounded-md  border-[#fdb0be] outline-none w-[29vw]"
                        placeholder="Leave a message"
                        required
                    ></textarea>
                   <div className="flex gap-5">
                   <button
                        type="reset"
                        value="reset"
                        className="border-2 border-[#f84464] px-6 py-1 rounded-2xl hover:bg-[#f84464] hover:text-white"
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        value="Submit"
                  className="border-2 border-[#FCCD2A] px-6 py-1 rounded-2xl hover:bg-[#FCCD2A] hover:text-white"
                    >
                        Submit
                    </button>
                   </div>
                </form>
           
        </div>
        <div className="w-1/2 flex flex-col gap-3">
        <div className="flex flex-col p-4 rounded-md bg-[#FEECB3]">
            <h2 className="text-[24px] font-bold ">Customer Support:</h2>
            <ul>
              <li className="mb-2">
                For assistance with your bookings, refunds, or any other
                inquiries, please reach out to our Customer Support team.
              </li>
              <ul>
                <li>
                  <b>Email: </b>support@ticketify.com
                </li>
                <li>
                  <b>Phone: </b>1-800-MOVIE-TIX (1-800-668-4384)
                </li>
                <li>
                  <b>Live Chat: </b>Available on our website during business
                  hours
                </li>
              </ul>
            </ul>
          </div>

          <div className="flex flex-col bg-[#FFF6EA] p-4 rounded-md">
            <h2 className="text-[24px] font-bold">Business Inquiries:</h2>
            <ul >
              <li className="mb-2">
                Interested in partnership opportunities or have a business
                proposal? Contact our Business Development team.
              </li>
              <ul >
                <li>
                  <b>Email: </b>partnership@ticketify.com
                </li>
                <li>
                  <b>Phone: </b>1-888-555-PART (1-888-555-7278)
                </li>
              </ul>
            </ul>
          </div>

          <div className="flex flex-col bg-[#CDFAD5] p-4 rounded-md">
            <ul >
              <li className="mb-2">
                We value your feedback and suggestions. Let us know how we can
                improve your experience.
              </li>
              <ul
               
              >
                <li>
                  <b>Email: </b>feedback@yourmovietickets.com
                </li>
              </ul>
            </ul>

            <h2 className="text-[22px] font-light font-sans  mt-2" >
              Address
            </h2>
            <p className="font-semibold"
            >
              Ticketify private limited, 123 Movie Ave, Surat, Gujarat, 394107,
              India
            </p>
          </div>
          <p
            className="italic text-sm"
            
          >
            Feel free to reach out to us through any of the above channels. We
            strive to respond to all inquiries within 24 hours during business
            days. Thank you for choosing Ticketify!
          </p>
        </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;

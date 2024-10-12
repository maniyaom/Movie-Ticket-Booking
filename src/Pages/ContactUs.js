import React, { useEffect, useState,useRef } from "react";
import { useFirebase } from "../context/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import loader_icon from "../assets/icons/loader_icon.gif";
import "./utils.css";
import "./AboutUs.css";
import Footer from "../components/Footer";
import emailjs from '@emailjs/browser';
const ContactUs = () => {
  const form = useRef()
  const sendEmail = (e) => {
    e.preventDefault();
  
    
    const serviceId = "service_8ogy99w";
    const templateId ="template_j3ccezl";
    const publicKey ="9FwALyT04urfo1wyj";
    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  

  return (

  <>
   <div className="p-5 lg:p-10">
  <h1 className="text-[#f84464] text-3xl lg:text-4xl text-center mb-6 lg:mb-10">
    Contact Us
  </h1>

  <div className="flex max-md:flex-col lg:flex-row sm:flex-col  gap-10 lg:gap-16">
    {/* Left Section */}
    <div className="border-2 w-full lg:w-1/2 p-6 shadow-lg rounded-lg mb-10 lg:mb-0">
      <h1 className="text-sm text-[#f84464] mb-5">
      Thank you for choosing Ticketify! We're here to assist you with any
            questions or concerns you may have. Here's how you can get in touch
            with us:
      </h1>
      <form className="flex flex-col gap-5" onSubmit={sendEmail} ref={form}>
        
          <input
            type="text"
            name="from_name"
            className="p-2 border-2 rounded-md border-[#fdb0be] outline-none w-full"
            placeholder="Enter Your Name"
            required
          />
         

        <input
          type="email"
          name="user_email"
          className="p-2 border-2 rounded-md border-[#fdb0be] outline-none w-full"
          placeholder="Enter Email"
          required
        />

        <input
          type="tel"
          name="number"
          className="p-2 border-2 rounded-md border-[#fdb0be] outline-none w-full"
          placeholder="Enter Mobile Number"
          required
        />

        <textarea
          rows="7"
          name="message"
          className="p-2 border-2 rounded-md border-[#fdb0be] outline-none w-full"
          placeholder="Leave a Message"
          required
        ></textarea>

        <div className="flex justify-center ">
         
          <button
            className="border-2 px-4 py-1 rounded-xl border-[#FCCD2A] hover:bg-[#FCCD2A] hover:text-white"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>

    {/* Right Section */}
    <div className="flex flex-col gap-6 w-full lg:w-2/3">
      <div className="p-4 rounded-md bg-[#FEECB3]">
        <h2 className="text-lg font-bold mb-2">Customer Support:</h2>
        <ul className="list-disc pl-5">
          <li className="mb-1">
            For bookings, refunds, or inquiries, contact Customer Support.
          </li>
          <li><b>Email:</b> support@ticketify.com</li>
          <li><b>Phone:</b> 1-800-MOVIE-TIX (1-800-668-4384)</li>
          <li><b>Live Chat:</b> Available during business hours</li>
        </ul>
      </div>

      <div className="p-4 rounded-md bg-[#FFF6EA]">
        <h2 className="text-lg font-bold mb-2">Business Inquiries:</h2>
        <ul className="list-disc pl-5">
          <li className="mb-1">
            For partnerships or business proposals, contact us.
          </li>
          <li><b>Email:</b> partnership@ticketify.com</li>
          <li><b>Phone:</b> 1-888-555-PART (1-888-555-7278)</li>
        </ul>
      </div>

      <div className="p-4 rounded-md bg-[#CDFAD5]">
        <ul className="list-disc pl-5">
          <li className="mb-1">We value your feedback and suggestions!</li>
          <li><b>Email:</b> feedback@yourmovietickets.com</li>
        </ul>
        <h2 className="text-lg mt-2">Address</h2>
        <p className="font-semibold">
          Ticketify Pvt. Ltd., 123 Movie Ave, Surat, Gujarat, 394107, India
        </p>
      </div>

      <p className="italic text-sm">
      Feel free to reach out to us through any of the above channels. We
            strive to respond to all inquiries within 24 hours during business
            days. Thank you for choosing Ticketify!
      </p>
    </div>
  </div>
</div>



    <Footer />
  </>
);

};

export default ContactUs;

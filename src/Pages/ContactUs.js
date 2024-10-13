import React, { useState, useRef } from "react";
import loader_icon from "../assets/icons/loader_icon.gif";
import "./utils.css";
import "./AboutUs.css";
import Footer from "../components/Footer";
import emailjs from '@emailjs/browser';
const ContactUs = () => {
  const [nameOfTheUser, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useRef();
  const sendEmail = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const serviceId = process.env.REACT_APP_EMAIL_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAIL_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAIL_PUBLIC_KEY;
    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then(
        () => {
          setIsLoading(false);
          alert('Our team will contact you shortly.');
          form.current.reset();
        },
        (error) => {
          setIsLoading(false);
          alert('Failed to send the message!!', error.text);
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
            <p className="mb-6 text-gray-500 text-sm">Thank you for choosing Ticketify! We're here to assist you with any
              questions or concerns you may have. Here's how you can get in touch
              with us:</p>
            <form className="flex flex-col gap-5" onSubmit={sendEmail} ref={form}>
              <div>
                <div className="flex justify-between align-center">
                  <label htmlFor="nameOfTheUser" className="mb-2 inline-block text-sm font-medium text-gray-700">Name</label>
                </div>
                <input type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-3 px-3 text-sm outline-none focus:bg-white focus:text-gray-600 focus:shadow" id="nameOfTheUser" name="nameOfTheUser" placeholder="Enter Your Name" autoFocus=""
                  value={nameOfTheUser}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <div className="flex justify-between align-center">
                  <label className="mb-2 inline-block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                </div>
                <div className="relative flex flex-col w-full flex-wrap items-stretch">
                  <input type="email" id="email" className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-3 px-3 text-sm outline-none focus:bg-white focus:text-gray-600 focus:shadow" name="email" placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between align-center">
                  <label className="mb-2 inline-block text-sm font-medium text-gray-700" htmlFor="phone">Phone</label>
                </div>
                <div className="relative flex flex-col w-full flex-wrap items-stretch">
                  <input type="tel" id="phone" className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-3 px-3 text-sm outline-none focus:bg-white focus:text-gray-600 focus:shadow" name="phone" placeholder="Enter Mobile Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between align-center">
                  <label className="mb-2 inline-block text-sm font-medium text-gray-700">Message</label>
                </div>

                <div className="relative flex flex-col w-full flex-wrap items-stretch">
                  <textarea className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-3 px-3 text-sm outline-none focus:bg-white focus:text-gray-600 focus:shadow" placeholder="Leave a Message" name="message"
                    rows="7"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
              </div>

              {isLoading && (
                <div className="flex justify-center mb-1">
                  <img src={loader_icon} className="w-12 h-12" alt="Loader Icon" />
                </div>
              )}

              <div className="mb-2">
                <button className="grid w-full cursor-pointer select-none rounded-md border border-rose-500 bg-rose-500 py-2 px-5 text-center align-middle text-base font-semibold text-white shadow hover:border-rose-600 hover:bg-rose-600 hover:text-white focus:border-rose-600 focus:bg-rose-600 focus:text-white focus:shadow-none">Send Message</button>
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
        </div >
      </div >



      <Footer />
    </>
  );

};

export default ContactUs;

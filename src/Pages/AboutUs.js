
import React, { useEffect, useState } from 'react';
import './AboutUs.css';
import facebook_icon from '../assets/icons/facebook.png';
import instagram_icon from '../assets/icons/instagram.png';
import linkedin_icon from '../assets/icons/linkedin.png';
import twitter_icon from '../assets/icons/twitter.png';
import join_our_community from '../assets/images/join-our-community.jpg';
import our_mission from '../assets/images/our-mission.jpg';
import who_we_are from '../assets/images/who-we-are.jpg';
import Footer from '../components/Footer';

const AboutUs = () => {
  const [openFaq, setOpenFaq] = useState(null); // State to track which FAQ is open

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index); // Toggle the FAQ open/closed
  };

  useEffect(() => {
    document.title = 'About Us';
  }, []);

  const [openFAQ, setOpenFAQ] = useState(null);

const toggleFAQ = (index) => {
  if (openFAQ === index) {
    setOpenFAQ(null); // Close the current FAQ
  } else {
    setOpenFAQ(index); // Open the clicked FAQ
  }
};

const faqData = [
  {
    question: "How can I book a movie ticket?",
    answer: "Simply visit our homepage, select your movie, choose the seats, and complete the payment process. It's that easy!"
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes, we use advanced encryption technologies to ensure that your payment details are safe and secure."
  },
  {
    question: "Can I cancel my booking?",
    answer: "Yes, cancellations are allowed up to 2 hours before the showtime. Refunds will be processed as per our cancellation policy."
  },
  {
    question: "What if I face any issues?",
    answer: "Our customer support team is available 24/7 to help you with any issues or queries you may have."
  }
];

  return (
    <>
      <div>
        <h1 style={{ color: '#f84464', textAlign: 'center', marginTop: '30px', fontSize: '43px' }}>About Us</h1>

        <div style={{ fontWeight: '600', margin: '10px 200px' }} className='About_Us_Text'>
          Welcome to MovieTicketsOnline, your ultimate destination for booking movie tickets with ease and convenience. We are passionate about movies and committed to bringing you the best cinema experience from the comfort of your home.
        </div>

        {/* Who We Are */}
        <div className="card-image-div">
          <div><img src={who_we_are} alt="Who We Are" /></div>
          <div>
            <div className="title">Who We Are</div>
            <p>At MovieTicketsOnline, we are a team of dedicated movie enthusiasts and tech experts with a shared vision: to revolutionize the way you book movie tickets. Founded in 2024, our mission is to make movie ticket booking seamless, fast, and enjoyable for everyone.</p>
          </div>
        </div>

        {/* Our Mission */}
        <div className="card-image-div">
          <div><img src={our_mission} alt="Our Mission" /></div>
          <div>
            <div className="title">Our Mission</div>
            <p>Our mission is simple: to enhance your movie-going experience by providing a hassle-free ticket booking service. We believe that watching a movie should be an escape, a joy, and an experience to remember. Our platform is designed to ensure that you spend more time enjoying the movie and less time worrying about tickets.</p>
          </div>
        </div>

        {/* What We Offer */}
        <div className="card-without-image">
          <div className="title" style={{ textAlign: 'center' }}>What We Offer</div>
          <ol>
            <li>Wide Selection of Movies</li>
            <p>From the latest blockbusters to indie gems, we offer a comprehensive selection of movies across various genres and languages.</p>

            <li>Easy Booking Process</li>
            <p>Our user-friendly interface makes booking tickets a breeze. Select your movie, choose seats, and make a secure payment in just a few clicks.</p>

            <li>Secure Payments</li>
            <p>Your security is our priority. We use advanced encryption technologies to ensure that your payment information is safe.</p>

            <li>Customer Support</li>
            <p>Our dedicated customer support team is here to assist you 24/7 with any queries or issues you may have.</p>
          </ol>
        </div>

        {/* Why Choose Us */}
        <div className="card-without-image">
          <div className="title" style={{ textAlign: 'center' }}>Why Choose Us?</div>
          <ol>
            <li>Convenience</li>
            <p>Book tickets anytime, anywhere, without standing in long queues.</p>

            <li>Variety</li>
            <p>We offer a wide range of movies and theaters to suit your preferences.</p>

            <li>Reliability</li>
            <p>Our secure platform guarantees customer satisfaction with a smooth experience.</p>

            <li>Innovation</li>
            <p>We continuously improve our services to provide the best movie-booking experience.</p>
          </ol>
        </div>

        {/* Testimonials Section */}
<div className="testimonials-section">
  <div className="title" style={{ textAlign: 'center' }}>What Our Customers Say</div>
  <div className="testimonials">
    {testimonialsData.map((testimonial, index) => (
      <div className="testimonial-item" key={index}>
        <div className="testimonial-content">
          <p className="testimonial-feedback">"{testimonial.feedback}"</p>
          <div className="testimonial-author">
            <span className="author-icon">👤</span>
            {testimonial.author}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


      {/* FAQ Section */}
<div className="faq-section">
  <div className="title" style={{ textAlign: 'center' }}>Frequently Asked Questions (FAQs)</div>
  <div className="faq">
    {faqData.map((faq, index) => (
      <div key={index} className={`faq-item ${openFAQ === index ? 'open' : ''}`} onClick={() => toggleFAQ(index)}>
        <div className="faq-question">
          <h4>{faq.question}</h4>
          <span className={`arrow ${openFAQ === index ? 'open' : ''}`}>&#9660;</span>
        </div>
        {openFAQ === index && <p className="faq-answer">{faq.answer}</p>}
      </div>
    ))}
  </div>
</div>


        {/* Join Our Community */}
        <div className="card-image-div">
          <div><img src={join_our_community} alt="Join Our Community" /></div>
          <div>
            <div className="title">Join Our Community</div>
            <p>Be a part of our growing community of movie lovers. Follow us on social media to stay updated with the latest movie releases, reviews, and exclusive offers.</p>
            <div className="social-icons">
              <a href="https://www.facebook.com/"><img src={facebook_icon} alt="Facebook" /></a>
              <a href="https://www.instagram.com/"><img src={instagram_icon} alt="Instagram" /></a>
              <a href="https://twitter.com/"><img src={twitter_icon} alt="Twitter" /></a>
              <a href="https://linkedin.com/"><img src={linkedin_icon} alt="LinkedIn" /></a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

// Sample data for FAQs and Testimonials
const faqData = [
  { question: 'How can I book a movie ticket?', answer: 'Simply visit our homepage, select your movie, choose the seats, and complete the payment process. It\'s that easy!' },
  { question: 'Is my payment information secure?', answer: 'Yes, we use advanced encryption technologies to ensure that your payment details are safe and secure.' },
  { question: 'Can I cancel my booking?', answer: 'Yes, cancellations are allowed up to 2 hours before the showtime. Refunds will be processed as per our cancellation policy.' },
  { question: 'What if I face any issues?', answer: 'Our customer support team is available 24/7 to help you with any issues or queries you may have.' }
];

const testimonialsData = [
  { feedback: 'I love how easy it is to book tickets! The interface is so simple and user-friendly.', author: 'John Doe' },
  { feedback: 'Great service and excellent customer support. My go-to app for booking movie tickets!', author: 'Jane Smith' },
  { feedback: 'Quick and reliable. I always use this platform to book tickets for my family.', author: 'Chris Lee' },
];

export default AboutUs;

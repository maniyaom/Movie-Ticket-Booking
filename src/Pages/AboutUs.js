import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './AboutUs.css'
import facebook_icon from '../assets/icons/facebook2.png'
import instagram_icon from '../assets/icons/instagram2.png'
import linkedin_icon from '../assets/icons/linkedin2.png'
import twitter_icon from '../assets/icons/twitter.png'
import join_our_community from '../assets/images/join-our-community.jpg'
import our_mission from '../assets/images/our-mission.jpg'
import who_we_are from '../assets/images/who-we-are.png'
import Footer from '../components/Footer'

// Sample data for FAQs and Testimonials
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

// const testimonialsData = [
//   { feedback: 'I love how easy it is to book tickets! The interface is so simple and user-friendly.', author: 'John Doe' },
//   { feedback: 'Great service and excellent customer support. My go-to app for booking movie tickets!', author: 'Jane Smith' },
//   { feedback: 'Quick and reliable. I always use this platform to book tickets for my family.', author: 'Chris Lee' },
// ];

const AboutUs = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  useEffect(() => {
    document.title = 'About Us';
  }, []);

  return (
    <>
      <div>
        <h1 style={{ color: '#f84464', textAlign: 'center', marginTop: '30px', fontSize: '43px' }}>About Us</h1>

        <div style={{ fontWeight: '600', margin: '10px 200px' }} className='About_Us_Text'>
          Welcome to MovieTicketsOnline, your ultimate destination for booking movie tickets with ease and convenience. We are passionate about movies and committed to bringing you the best cinema experience from the comfort of your home.
        </div>

        <div className="card-image-div">
          <div>
            <img src={who_we_are} alt="Who We Are" />
          </div>
          <div>
            <div className="title">Who We Are</div>
            <p>At Ticketify, we are a team of dedicated movie enthusiasts and tech experts with a shared vision: to revolutionize the way you book movie tickets. Founded in 2024, our mission is to make movie ticket booking seamless, fast, and enjoyable for everyone.</p>
          </div>
        </div>

        <div className="card-image-div">
          <div>
            <img src={our_mission} alt="Our Mission" />
          </div>
          <div>
            <div className="title">Our Mission</div>
            <p>Our mission is simple: to enhance your movie-going experience by providing a hassle-free ticket booking service. We believe that watching a movie should be an escape, a joy, and an experience to remember. Our platform is designed to ensure that you spend more time enjoying the movie and less time worrying about tickets.</p>
          </div>
        </div>

        <div className="card-without-image">
          <div className="title" style={{ textAlign: 'center' }}>What We Offer</div>
          <ol>
            <li>Wide Selection of Movies</li>
            <p>From the latest blockbusters to indie gems, we offer a comprehensive selection of movies across various genres and languages. Whether you're a fan of action, drama, comedy, or romance, you'll find it all here.</p>

            <li>Easy Booking Process</li>
            <p>Our user-friendly interface makes booking tickets a breeze. With just a few clicks, you can select your favorite movie, choose the best seats, and make a secure payment.</p>

            <li>Secure Payments</li>
            <p>Your security is our priority. We use advanced encryption technologies to ensure that your payment information is safe and secure.</p>

            <li>Customer Support</li>
            <p>Our dedicated customer support team is here to assist you with any queries or issues. We are available 24/7 to provide you with the best possible service.</p>
          </ol>
        </div>

        <div className="card-without-image">
          <div className="title" style={{ textAlign: 'center' }}>Why Choose Us?</div>
          <ol>
            <li>Convenience</li>
            <p>Book your tickets anytime, anywhere, without the hassle of standing in long queues.</p>

            <li>Variety</li>
            <p>A wide range of movies and theaters to choose from, catering to diverse tastes and preferences.</p>

            <li>Reliability</li>
            <p>Trustworthy and secure platform with a proven track record of customer satisfaction.</p>

            <li>Innovation</li>
            <p>Continuously improving our services to provide you with the latest features and best user experience.</p>
          </ol>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials-section">
        <div className="title" style={{ textAlign: "center" , fontWeight:"bold" }}>
          What Our Customers Say
        </div>
        <Row className="py-5 text-center">
          <Col md="12">
            <Carousel>
              <Carousel.Item>
                <p className="lead font-italic mx-4 mx-md-5">
                  "I love how easy it is to book tickets! The interface is so simple and user-friendly."
                </p>
                <div className="mt-5 mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
                    className="rounded-circle img-fluid shadow-1-strong"
                    alt="John Doe"
                    width="100"
                    height="100"
                  />
                </div>
                <p className="text-muted mb-0">- John Doe</p>
              </Carousel.Item>

              <Carousel.Item>
                <p className="lead font-italic mx-4 mx-md-5">
                  "Great service and excellent customer support. My go-to app for booking movie tickets!"
                </p>
                <div className="mt-5 mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp"
                    className="rounded-circle img-fluid shadow-1-strong"
                    alt="Jane Smith"
                    width="100"
                    height="100"
                  />
                </div>
                <p className="text-muted mb-0">- Jane Smith</p>
              </Carousel.Item>

              <Carousel.Item>
                <p className="lead font-italic mx-4 mx-md-5">
                  "Quick and reliable. I always use this platform to book tickets for my family."
                </p>
                <div className="mt-5 mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                    className="rounded-circle img-fluid shadow-1-strong"
                    alt="Chris Lee"
                    width="100"
                    height="100"
                  />
                </div>
                <p className="text-muted mb-0">- Chris Lee</p>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
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
          <div>
            <img src={join_our_community} alt="Join Our Community" />
          </div>
          <div>
            <div className="title">Join Our Community</div>
            <p>Be a part of our growing community of movie lovers. Follow us on social media to stay updated with the latest movie releases, reviews, and exclusive offers. Share your movie experiences with us and connect with fellow cinephiles.</p>
            <p>Thank you for choosing MovieTicketsOnline. We look forward to making your movie-watching experience unforgettable.</p>

            <div className="social-icons">
              <Link to="https://www.facebook.com/"><img src={facebook_icon} alt="Facebook" /></Link>
              <Link to="https://www.instagram.com/"><img src={instagram_icon} alt="Instagram" /></Link>
              <Link to="https://twitter.com/"><img src={twitter_icon} alt="Twitter" /></Link>
              <Link to="https://linkedin.com/"><img src={linkedin_icon} alt="LinkedIn" /></Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;

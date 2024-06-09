import React from 'react'
import Navbar from '../Components/Navbar'
import './AboutUs.css'
import facebook_icon from '../assets/icons/facebook.png'
import instagram_icon from '../assets/icons/instagram.png'
import linkedin_icon from '../assets/icons/linkedin.png'
import twitter_icon from '../assets/icons/twitter.png'
import join_our_community from '../assets/images/join-our-community.jpg'
import our_mission from '../assets/images/our-mission.jpg'
import who_we_are from '../assets/images/who-we-are.jpg'

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div>
        <h1 style={{ color: '#f84464', textAlign: 'center', marginTop: '30px', fontSize: '43px' }}>About Us</h1>

        <div style={{ opacity: '0.8', fontWeight: '600', margin: '10px 200px' }}>
          Welcome to MovieTicketsOnline, your ultimate destination for booking movie tickets with ease and convenience. We are passionate about movies and committed to bringing you the best cinema experience from the comfort of your home.
        </div>

        <div className="card-image-div">
          <div>
            <img src={who_we_are} alt="Who We Are" />
          </div>
          <div>
            <div className="title">Who We Are</div>
            <p>At MovieTicketsOnline, we are a team of dedicated movie enthusiasts and tech experts with a shared vision: to revolutionize the way you book movie tickets. Founded in 2024, our mission is to make movie ticket booking seamless, fast, and enjoyable for everyone.</p>
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

        <div className="card-image-div">
          <div>
            <img src={join_our_community} alt="Join Our Community" />
          </div>
          <div>
            <div className="title">Join Our Community</div>
            <p>Be a part of our growing community of movie lovers. Follow us on social media to stay updated with the latest movie releases, reviews, and exclusive offers. Share your movie experiences with us and connect with fellow cinephiles.</p>
            <p>Thank you for choosing MovieTicketsOnline. We look forward to making your movie-watching experience unforgettable.</p>

            <div className="social-icons">
              <a href="https://www.facebook.com/"><img src={facebook_icon} alt="Facebook" /></a>
              <a href="https://www.instagram.com/"><img src={instagram_icon} alt="Instagram" /></a>
              <a href="https://twitter.com/"><img src={twitter_icon} alt="Twitter" /></a>
              <a href="https://linkedin.com/"><img src={linkedin_icon} alt="LinkedIn" /></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
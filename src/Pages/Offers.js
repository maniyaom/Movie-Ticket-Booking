import React, { useState } from 'react';
import './Offers.css'; // Import the CSS file for styling
import Footer from '../components/Footer';

// Sample data for offers
const offersData = [
  {
    id: 1,
    title: 'Aurum Credit Card Offer',
    description: 'Get exclusive discounts on movie tickets when using Aurum Credit Card.',
    discount: '20% Off',
    image: 'https://in.bmscdn.com/offers/tncbanner/aurum-credit-card-offer-sbispr0420.jpg?28082024113232',
    category: 'Credit' // Added category
  },
  {
    id: 2,
    title: 'Federal Bank Credit Card Offer',
    description: 'Enjoy amazing benefits when booking tickets with Federal Bank Credit Card.',
    discount: '15% Off',
    image: 'https://in.bmscdn.com/offers/tncbanner/federal-bank-credit-card-offer-fedcc0722.jpg?26092024151130',
    category: 'Credit' // Added category
  },
  {
    id: 3,
    title: 'SBI INR 500 Off on Signature Credit Card',
    description: 'Claim INR 500 off on your movie ticket purchase using SBI Signature Card.',
    discount: 'INR 500 Off',
    image: 'https://in.bmscdn.com/offers/tncbanner/sbi-inr-500-off-on-signature-credit-card-sbi0613.jpg?28082024113314',
    category: 'Credit' // Added category
  },
  {
    id: 4,
    title: 'Kotak Bank Peppa Pig’s Adventure Offer',
    description: 'Get a special discount when booking tickets for Peppa Pig’s Adventure.',
    discount: '10% Off',
    image: 'https://in.bmscdn.com/offers/tncbanner/kotak-bank-peppa-pig%E2%80%99s-adventure-offer-ktpep0824.jpg?07102024130314',
    category: 'Debit' // Added category
  },
  {
    id: 5,
    title: 'Reliance SBI Card Prime Offer',
    description: 'Exclusive benefits when booking with Reliance SBI Card Prime.',
    discount: '25% Off',
    image: 'https://in.bmscdn.com/offers/tncbanner/reliance-sbi-card-prime-sbiril1123.jpg?20092024200323',
    category: 'Credit' // Added category
  },
  {
    id: 6,
    title: 'Yes Bank Marquee Credit Card Offer',
    description: 'Get extra discounts on your movie tickets with Yes Bank Marquee Card.',
    discount: '30% Off',
    image: 'https://in.bmscdn.com/offers/tncbanner/yes-bank-marquee-credit-card-offer-yesmrq1123.jpg?06022024140523',
    category: 'Credit' // Added category
  },
  {
    id: 7,
    title: 'Visa Infinite Program Offer',
    description: 'Special discounts for Visa Infinite cardholders.',
    discount: '30% Off',
    image: 'https://in.bmscdn.com/offers/tncbanner/visa-infinite-program-vip0116.jpg?01022024075355',
    category: 'Credit' // Added category
  },
  {
    id: 8,
    title: 'UPI Cashback Offer',
    description: 'Get instant cashback when paying via UPI.',
    discount: 'Flat INR 100 Off',
    image: 'https://in.bmscdn.com/offers/tncbanner/sbi-inr-500-off-on-signature-credit-card-sbi0613.jpg?28082024113314',
    category: 'UPI' // Added category
  }
];

const Offers = () => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [filter, setFilter] = useState('All');

  const handleClaimOffer = (offer) => {
    setSelectedOffer(offer);
  };

  const closeModal = () => {
    setSelectedOffer(null);
  };

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  const filteredOffers = filter === 'All' ? offersData : offersData.filter(offer => offer.category === filter);

  return (
    <div className="offers-page">
      <h1 className="offers-title">Current Offers</h1>

      {/* Filter buttons */}
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange('All')}>All</button>
        <button onClick={() => handleFilterChange('Credit')}>Credit</button>
        <button onClick={() => handleFilterChange('Debit')}>Debit</button>
        <button onClick={() => handleFilterChange('UPI')}>UPI</button>
        <button onClick={() => handleFilterChange('Rewards')}>Rewards</button>
      </div>

      <div className="offers-container">
        {filteredOffers.map((offer) => (
          <div key={offer.id} className="offer-card">
            <img src={offer.image} alt={offer.title} className="offer-image" />
            <h3>{offer.title}</h3>
            <p className="offer-description">{offer.description}</p>
            <p className="offer-discount">{offer.discount}</p>
            <button className="offer-button" onClick={() => handleClaimOffer(offer)}>
              Claim Offer
            </button>
          </div>
        ))}
      </div>

      {/* Modal for detailed offer information */}
      {selectedOffer && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2>{selectedOffer.title}</h2>
            <p>{selectedOffer.description}</p>
            <p><strong>Discount:</strong> {selectedOffer.discount}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Offers;

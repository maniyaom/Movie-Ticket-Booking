import React, { useState } from 'react';

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
    rating: 0,
  });
  const [hoverRating, setHoverRating] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRating = (rate) => {
    setFormData({ ...formData, rating: rate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback Submitted:', formData);
    // Clear the form after submission
    setFormData({ name: '', email: '', feedback: '', rating: 0 });
    setHoverRating(0);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>We Value Your Feedback</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="name" style={styles.label}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="feedback" style={styles.label}>Your Feedback:</label>
          <textarea
            id="feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleInputChange}
            required
            rows="4"
            style={styles.textarea}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="rating" style={styles.label}>Rating:</label>
          <div style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  ...styles.star,
                  color: (hoverRating || formData.rating) >= star ? 'rgba(248, 68, 100, 1)' : '#ccc',
                  transform: hoverRating >= star ? 'scale(1.2)' : 'scale(1)',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <button type="submit" style={styles.button}>Submit Feedback</button>
      </form>
    </div>
  );
};

// Enhanced Styles with rgba(248, 68, 100, 0.5) color theme and better UI
const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'rgba(248, 68, 100, 0.05)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '28px',
    color: 'rgba(248, 68, 100, 1)',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    marginBottom: '8px',
    fontSize: '18px',
    color: 'rgba(248, 68, 100, 0.8)',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid rgba(248, 68, 100, 0.3)',
    fontSize: '16px',
    backgroundColor: '#fff',
    transition: 'border-color 0.3s',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid rgba(248, 68, 100, 0.3)',
    fontSize: '16px',
    backgroundColor: '#fff',
    transition: 'border-color 0.3s',
  },
  inputFocused: {
    borderColor: 'rgba(248, 68, 100, 0.8)',
  },
  starContainer: {
    display: 'flex',
  },
  star: {
    fontSize: '35px',
    cursor: 'pointer',
    marginRight: '8px',
  },
  button: {
    padding: '12px 18px',
    backgroundColor: 'rgba(248, 68, 100, 0.8)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: 'rgba(248, 68, 100, 1)',
  },
};

export default FeedbackPage;

// src/pages/dashboard.style.js

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    padding: '5vw', // relative padding for better mobile scaling
  },
  heading: {
    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', // responsive font size
    marginBottom: '24px',
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '16px',
    border: '1px solid #ddd',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  cardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
  },
  cardTitle: {
    fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
    fontWeight: '600',
    color: '#0077cc',
    marginBottom: '10px',
  },
  cardText: {
    color: '#666',
    fontSize: 'clamp(0.9rem, 3.5vw, 1rem)',
  },
};

export default styles;

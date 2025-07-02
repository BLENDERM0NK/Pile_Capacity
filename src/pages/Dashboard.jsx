// src/pages/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './dashboard.style';
import Navbar from '../components/Navbar';

function Dashboard() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>Welcome to Engineering Tools</h2>
        <div
          style={isHovered ? { ...styles.card, ...styles.cardHover } : styles.card}
          onClick={() => navigate('/pile-calculator')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h3 style={styles.cardTitle}>Pile Foundation</h3>
          <p style={styles.cardText}>Click to calculate pile capacity</p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

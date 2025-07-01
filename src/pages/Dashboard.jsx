// src/pages/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './Dashboard.css'; // optional, for styling

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h2>Welcome to Engineering Tools</h2>
      <div
        className="card"
        onClick={() => navigate('/pile-calculator')}
        style={{ cursor: 'pointer', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}
      >
        <h3>Pile Foundation</h3>
        <p>Click to calculate pile capacity</p>
      </div>
    </div>
  );
}

export default Dashboard;

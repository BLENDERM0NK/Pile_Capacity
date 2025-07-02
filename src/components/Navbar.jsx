// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

function Navbar() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);

  // Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Clean up on unmount
  }, [auth]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/'); // Redirect to dashboard after logout
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  return (
    <nav style={styles.navbar}>
      <h3 style={styles.title}>Engineering Tools</h3>
      {user && (
        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      )}
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#0077cc',
    color: '#fff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: 0,
  },
  button: {
    backgroundColor: '#fff',
    color: '#0077cc',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BackgroundImageScreen.css';

const BackgroundImageScreen = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate an image loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  const handleStartClick = () => {
    navigate('/login'); // Navigate to the LoginRegistration screen
  };

  return (
    <div className="background-image-screen">
      {loading ? (
        <div className="loading-overlay">
          <div className="loading-bar-container">
            <div className="loading-bar"></div>
          </div>
        </div>
      ) : (
        <button className="start-button" onClick={handleStartClick}>
          Start
        </button>
      )}
    </div>
  );
};

export default BackgroundImageScreen;

import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import baseURL from './LoginSignup/api'; // Adjust the path as needed
import './WinScreen.css'; // Import the CSS file

const WinScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Expect RoomId to be passed via location.state
  const { roomId } = location.state || {};

  useEffect(() => {
    // No orientation locking is needed on web.
    return () => {
      // Cleanup if needed on unmount.
    };
  }, []);

  const handleExit = () => {
    
    navigate('/online-multiplayer');
    close();
  };

  const close = async () => {
    try {
      const userData = localStorage.getItem('Playerid');
      const response = await fetch(
        `${baseURL}Terrotoriy/RoomClosing?playerId=${userData}&roomId=${roomId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        // Navigate to MainScreen (adjust the route as needed)
        navigate('/online-multiplayer');
      } else {
        const errorMessage =
          json.message ||
          JSON.stringify(json) ||
          'An error occurred while closing the room.';
        window.alert('Error: ' + errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      window.alert('Error: ' + (error.message || 'Unexpected error.'));
    }
  };

  return (
    <div className="win-container">
      <div className="win-overlay">
        <img
          src={`${process.env.PUBLIC_URL}/Images/win.png`}
          alt="You Win"
          className="win-image"
        />
        <h1 className="win-title">Congratulations! You Win!</h1>
        <button onClick={handleExit} className="exit-button">
          Exit
        </button>
      </div>
    </div>
  );
};

export default WinScreen;

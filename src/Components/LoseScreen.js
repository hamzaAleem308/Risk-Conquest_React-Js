import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoseScreen.css'; // Import the CSS file

const LoseScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Expect RoomId to be passed via location.state (if needed)
  const { RoomId } = location.state || {};

  useEffect(() => {
    // Orientation locking isn’t needed on web.
    // (You could add custom CSS for a "landscape" look if desired.)
    return () => {
      // Cleanup if needed.
    };
  }, []);

  const handleExit = () => {
    navigate('/online-multiplayer'); // Adjust the route as needed
  };

  return (
    <div className="lose-container">
      <div className="lose-overlay">
        <img
          src={`${process.env.PUBLIC_URL}/Images/lose.png`}
          alt="You Lose"
          className="lose-image"
        />
        <h1 className="lose-title">Sorry, You Lose!</h1>
        <button onClick={handleExit} className="exit-button">
          Exit
        </button>
      </div>
    </div>
  );
};

export default LoseScreen;

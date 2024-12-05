import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Components/BattleModeSelectionScreen.css';
import singlePlayer from './Assets/singleplayer.png';
import multiPlayer from './Assets/multiplayer.png';

const BattleModeSelectionScreen = () => {
  const [selectedMode, setSelectedMode] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Check for essential user data in localStorage
  //   const playerId = localStorage.getItem('Playerid');
  //   const username = localStorage.getItem('username');

  //   if (!playerId || !username) {
  //     // If essential user data is missing, redirect to login
  //     navigate('/login');
  //   }
  // }, [navigate]);

  const handleModeSelection = (mode) => {
    setSelectedMode(mode);
    localStorage.setItem('selected-mode', mode); // Save selected mode to localStorage
  };

  const handleBattle = () => {
    if (selectedMode) {
      if (selectedMode === 'online') {
        navigate('/online-multiplayer'); // Navigate to join room page for multiplayer
      } else if (selectedMode === 'offline') {
        navigate('/offline-battle');
      }
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="battle-mode-selection-screen">
      <div className="selection-content">
        <button className="back-button" onClick={handleBack}>←</button>
        <h1>CHOOSE BATTLE MODE</h1>
        <div className="mode-selection-container">
          <div
            className={`mode-option ${selectedMode === 'offline' ? 'selected' : ''}`}
            onClick={() => handleModeSelection('offline')}
          >
            <img src={singlePlayer} alt="Solo" />
            <span>SOLO</span>
          </div>
          <div
            className={`mode-option ${selectedMode === 'online' ? 'selected' : ''}`}
            onClick={() => handleModeSelection('online')}
          >
            <img src={multiPlayer} alt="Play with Friends" />
            <span>Play with Friends</span>
          </div>
        </div>
        <button
          className="battle-button"
          onClick={handleBattle}
          disabled={!selectedMode}
        >
          Battle →
        </button>
      </div>
    </div>
  );
};

export default BattleModeSelectionScreen;

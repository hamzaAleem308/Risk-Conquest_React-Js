import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnlineMultiplayerScreen.css';
import baseURL from './LoginSignup/api';
import multiPlayer from './Assets/risk create game.png';

const OnlineMultiplayerScreen = () => {
  // Existing state
  const [gameId, setGameId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState(2);

  // NEW state for Map Selection Modal
  const [modalVisible3, setModalVisible3] = useState(false);
  const [selectedMap, setSelectedMap] = useState('WorldMap');

  const navigate = useNavigate();

  const CreateRoom = async () => {
    try {
      const storedUserInfo = localStorage.getItem('Playerid');

      if (storedUserInfo !== null) {
        alert(`Player ID: ${storedUserInfo}`);
      } else {
        alert('Player ID not found in localStorage');
        return; // Exit early if no Player ID is found
      }

      const roomData = {
        MaxPlayer: selectedPlayers,
        createDate: null, // using null directly
        PlayerId: storedUserInfo,
        status: 1, // hardcoded
        map: selectedMap
      };

      const p = JSON.stringify(roomData);

      console.log('Sending Data:', p);

      const response = await fetch(
        `${baseURL}Room/RoomCreation?id=${storedUserInfo}`,
        {
          method: 'POST',
          body: p,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response:', response.status);
      const json = await response.json();

      if (response.ok) {
        if (json === 'Leave previous room before making new') {
          alert('Leave previous room before making new');
        } else {
          alert('Room created successfully');
          navigate('/join-room', { state: { RoomId: json , selectedMap:selectedMap} });
        }
      } else {
        let errorMsg = 'Failed';
        if (json === ' Player not exist') {
          errorMsg = 'Player does not exist';
        } else {
          errorMsg = response.statusText;
        }
        console.error('Failed:', errorMsg);
        alert(`Error: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  const joinRoom = async () => {
    try {
      if (!gameId.trim()) {
        window.alert('Please enter a valid Game ID');
        return;
      }

      const currentPlayerId = localStorage.getItem('Playerid');
      if (!currentPlayerId) {
        window.alert('Player ID not found. Please log in again.');
        navigate('/login');
        return;
      }

      console.log("Sending Data:");
      console.log(`URL: ${baseURL}Room/RoomJoining?playerid=${currentPlayerId}&roomid=${gameId}`);

      let response = await fetch(
        `${baseURL}Room/RoomJoining?playerid=${currentPlayerId}&roomid=${gameId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      console.log('Response:', response.status);
      let json = await response.json();

      if (response.ok) {
        window.alert('Room Joined Successfully');
        navigate('/join-room2', { state: { RoomId: gameId, selectedMap:json.map, isHost: false } });
      } else {
        let errorMsg = 'Failed To Join Room';
        if (json === ' Room Does not Exist') {
          errorMsg = 'Room Does Not Exist';
        } else if (json === 'Invalid RoomID') {
          errorMsg = 'Invalid Room ID';
        } else if (json === 'Room is full') {
          errorMsg = 'Room is full';
        } else if (json === 'Player is Already in In Some Room') {
          errorMsg = 'Player is Already in Some Room';
        } else {
          errorMsg = response.statusText;
        }
        console.error('Failed to Join Room:', errorMsg);
        window.alert(errorMsg);
      }
    } catch (error) {
      console.error('Error:', error);
      window.alert(`Error: ${error.message}`);
    }
  };

  const handleBack = () => {
    navigate('/battle-mode-selection');
  };

  const handleCreateGame = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handlePlayerSelection = (num) => {
    setSelectedPlayers(num);
  };

  const handleLeaderboard = () => {
    
  };

  // NEW: Handle cancellation of the map modal
  const handleCancel3 = () => {
    setModalVisible3(false);
  };

  return (
    <div className="online-multiplayer-screen">
      <button className="back-button" onClick={handleBack}>
        ←
      </button>
      <button className="emoji-button">😃</button>

      <div className="content">
        <img
          src={multiPlayer}
          alt="Multiplayer Characters"
          className="character-image"
        />

        <button className="create-game-button" onClick={handleCreateGame}>
          Create Game ▶
        </button>

        {/* NEW: Button to open the Map Selection Modal */}
        <button className="friends-button" onClick={() => setModalVisible3(true)}>
          Select Map
        </button>

        <div className="bottom-buttons">
          <button className="friends-button" onClick={handleLeaderboard}>
            Leaderboard
          </button>
          <div className="join-game-container">
            <input
              type="text"
              placeholder="Enter Game ID"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              className="game-id-input"
            />
            <button className="join-game-button" onClick={joinRoom}>
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Existing Modal for selecting max players */}
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select Max Players</h2>
            {[2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => handlePlayerSelection(num)}
                className={selectedPlayers === num ? 'selected' : ''}
              >
                {num} Players
              </button>
            ))}
            <div className="modal-actions">
              <button onClick={handleModalClose}>Cancel</button>
              <button
                onClick={() => {
                  handleModalClose();
                  CreateRoom();
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW: Map Selection Modal (converted from your React Native code) */}
      {modalVisible3 && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select Map</h2>
            <div className="map-options">
              {['WorldMap', 'Asia', 'Africa', 'Europe', 'NorthAmerica', 'SouthAmerica', 'Australia'].map((map) => (
                <button
                  key={map}
                  onClick={() => setSelectedMap(map)}
                  className={`option-button ${selectedMap === map ? 'selected-option' : ''}`}
                >
                  {map}
                </button>
              ))}
            </div>
            <div className="modal-actions">
              <button onClick={handleCancel3}>Cancel</button>
              <button
                onClick={() => {
                  setModalVisible3(false);
                  console.log(`Selected Map: ${selectedMap}`);
                }}
              >
                Select
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineMultiplayerScreen;
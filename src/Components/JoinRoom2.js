import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './JoinRoom.css';
import baseURL from './LoginSignup/api';

// Import all avatar images (adjust paths as necessary)
import avatar1 from './Assets/Avatars/1.png';
import avatar2 from './Assets/Avatars/2.png';
import avatar3 from './Assets/Avatars/3.png';
import avatar4 from './Assets/Avatars/4.png';
import avatar5 from './Assets/Avatars/5.png';
import avatar6 from './Assets/Avatars/6.png';

const avatarImages = { 1: avatar1, 2: avatar2, 3: avatar3, 4: avatar4, 5: avatar5, 6: avatar6 };

const JoinRoom2 = () => {
  const [players, setPlayers] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { RoomId } = location.state;
  const { selectedMap } = location.state || {};
  useEffect(() => {
    console.log('Location state:', location.state);
    const roomIdFromState = RoomId;
    if (roomIdFromState) {
      setRoomId(roomIdFromState);
      fetchPlayers(roomIdFromState);
      checkRoomStart(roomIdFromState)
    } else {
      navigate('/'); // Redirect if RoomId is missing
    }

    const intervalId = setInterval(() => {
      if (roomIdFromState) {
        fetchPlayers(RoomId);
        checkRoomStart(RoomId)
      }
    }, 10000); // Fetch players every 10 seconds

    return () => clearInterval(intervalId);
  }, [RoomId, navigate]);


  const checkRoomStart = async (roomId) => {
    try {
      const currentPlayerId = localStorage.getItem('Playerid');
      if (!currentPlayerId) {
        alert('Player ID not found. Please log in again.');
        navigate('/login');
        return;
      }
  
      const response = await fetch(
        `${baseURL}Room/check_StartRoom?playerid=${currentPlayerId}&roomid=${roomId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      const text = await response.text();
      const textTrimmed = text.trim().toLowerCase();
      console.log('checkRoomStart Response:', textTrimmed);
  
      const RESPONSE_MESSAGES = {
        ROOM_NOT_STARTED: 'room not started yet',
        ROOM_STARTED : 'room started',
        PLAYER_NOT_EXIST: 'player doesn`t exists',
        ROOM_NOT_FOUND: 'room not found',
        ROOOM_NOT_FOUND: 'rooom not found', // Assuming this is a typo from the server
      };
  
      if (response.ok) {
        if (textTrimmed.includes('room not started yet')) {
            //window.alert('Room Not Started Yet');
            console.log('Room Not Started Yet');
          } else {
            if(selectedMap==='WorldMap'){
              window.alert('Enjoy the game!');
            navigate('/map', { state: { roomId, players } });
            }
            else if(selectedMap==='Asia'){
              window.alert('Enjoy the game!');
            navigate('/mapasia', { state: { roomId, players } });
            }
          }
      } else {
        let errorMsg = 'Failed to check room start';
        if (textTrimmed === RESPONSE_MESSAGES.PLAYER_NOT_EXIST) {
          errorMsg = "Player Doesn't Exist";
        } else if (
          textTrimmed === RESPONSE_MESSAGES.ROOM_NOT_FOUND ||
          textTrimmed === RESPONSE_MESSAGES.ROOOM_NOT_FOUND
        ) {
          errorMsg = 'Room Not Found';
        } else {
          errorMsg = response.statusText || 'Unknown Error';
        }
        console.error('Failed:', errorMsg);
        alert(`Error: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Error checking if room has started:', error);
      alert(`Error: ${error.message}`);
    }
  };
  
  
  const fetchPlayers = async (roomId) => {
    try {
      setIsLoading(true);
      const currentPlayerId = localStorage.getItem('Playerid');

      if (!currentPlayerId) {
        alert('Player ID not found. Please log in again.');
        navigate('/login');
        return;
      }

      const response = await fetch(
        `${baseURL}Room/FetchingJoin_p?playerid=${currentPlayerId}&roomid=${roomId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const json = await response.json();
        console.log('Fetched players:', json);

        // No need to map; assume the API returns players with correct property names
        setPlayers(json);
      } else {
        const errorText = await response.text();
        console.error('Failed to fetch players:', errorText);
        alert('Error: Failed to fetch players');
      }
    } catch (error) {
      console.error('Error fetching players:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };


  const handleLeaveRoom = async () => {
    if (!window.confirm('Are you sure you want to leave the room?')) {
      return;
    }

    const currentPlayerId = localStorage.getItem('Playerid');
    if (!currentPlayerId) {
      alert('Player ID not found. Please log in again.');
      navigate('/login');
      return;
    }

    try {
      console.log(`URL: ${baseURL}Room/EndRoom?roomid=${roomId}&playerid=${currentPlayerId}`);
      const response = await fetch(
        `${baseURL}Room/EndRoom?roomid=${roomId}&playerid=${currentPlayerId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      console.log('Response Status:', response.status);
      console.log('Content-Type:', response.headers.get('Content-Type'));

      const text = await response.text();
      console.log('Response Text:', text);

      if (response.ok) {
        if (parseInt(text) === 100) {
          window.alert('Room Ended');
          navigate('/CreateGame');
        } else {
          window.alert('You have left the room.');
          navigate('/online-multiplayer');
        }
      } else {
        console.error(`Failed: ${text}`);
        window.alert('Error: Try Again');
      }
    } catch (error) {
      console.error('Error:', error);
      window.alert(`Error: ${error.message}`);
    }
  };

  const handleBack = () => {
    handleLeaveRoom();
  };

  const handleStartGame = async () => {
    console.log('Start Game button clicked');

    const currentPlayerId = localStorage.getItem('Playerid');
    if (!currentPlayerId) {
      alert('Player ID not found. Please log in again.');
      navigate('/login');
      return;
    }

    try {
      console.log(`URL: ${baseURL}Room/StartRoom?playerid=${currentPlayerId}&roomid=${roomId}`);
      const response = await fetch(
        `${baseURL}Room/StartRoom?playerid=${currentPlayerId}&roomid=${roomId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      console.log('Response Status:', response.status);
      console.log('Content-Type:', response.headers.get('Content-Type'));

      const text = await response.text();
      console.log('Response Text:', text);

      if (response.ok) {
        window.alert('Enjoy the game!');
        navigate('/map1', { state: { roomId, players } });
      } else {
        console.error(`Failed to start game: ${text}`);
        window.alert('Error: Failed to start the game');
      }
    } catch (error) {
      console.error('Error starting game:', error);
      window.alert(`Error: ${error.message}`);
    }
  };

  const PlayerCard = ({ Avator, username, Rank, boxColor, PlayerId }) => (
    <div className="player-card" style={{ backgroundColor: boxColor }}>
      <img src={avatarImages[Avator] || avatarImages[1]} alt="Player Avatar" className="avatar" />
      <div className="player-info">
        <p className="name">{username}</p>
        <p className="rank">Rank: {Rank}</p>
      </div>
    </div>
  );

  return (
    <div className="join-room">
      <h1>Room ID: {roomId} Map Name: {selectedMap}</h1>
      <button className="back-button" onClick={handleBack} title="Leave Room">
        ←
      </button>
      {isLoading ? (
        <div className="loading">Loading players...</div>
      ) : (
        <div className="players-container">
          {players.map((player, index) => (
            <PlayerCard
              key={player.Playerid || index}
              username={player.username}
              Rank={player.Rank}
              Avator={player.Avator}
              boxColor={player.Color}
              PlayerId={player.PlayerId}
            />
          ))}
          {[...Array(4 - players.length)].map((_, index) => (
            <div key={`empty-${index}`} className="player-card empty">
              <p>Waiting for player...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JoinRoom2;

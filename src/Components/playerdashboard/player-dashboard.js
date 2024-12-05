import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './player-dashboard.css';

// Import all avatar images (adjust paths as necessary)
import avatar1 from '../Assets/Avatars/1.png';
import avatar2 from '../Assets/Avatars/2.png';
import avatar3 from '../Assets/Avatars/3.png';
import avatar4 from '../Assets/Avatars/4.png';
import avatar5 from '../Assets/Avatars/5.png';
import avatar6 from '../Assets/Avatars/6.png';

const avatarImages = { 1: avatar1, 2: avatar2, 3: avatar3, 4: avatar4, 5: avatar5, 6: avatar6 };

const PlayerDashboard = () => {
  const [id, setid] = useState(null);
  const [name, setname] = useState('');
  const [rank, setrank] = useState(0);
  const [ava, setava] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('Playerid'));
    const storedUserInfo1 = localStorage.getItem('username');
    const storedUserInfo2 = JSON.parse(localStorage.getItem('rank'));
    const storedUserInfo3 = JSON.parse(localStorage.getItem('avatar'));
    
    if (!storedUserInfo) {
      navigate('/login');
    } else {
      setid(storedUserInfo);
      setname(storedUserInfo1);
      setrank(storedUserInfo2);
      setava(storedUserInfo3);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user-info');
    navigate('/login');
  };

  const handleBattle = () => {
    navigate('/battle-mode-selection');
  };

  if (!id) return <div className="loading">Loading...</div>;

  const avatarImage = avatarImages[ava] || avatarImages[1];

  return (
    <div className="player-dashboard">
      <div className="dashboard-content">
        <div className="avatar-container">
          <img src={avatarImage} alt="Player Avatar" className="avatar" />
        </div>
        <h2 className="player-name">{name}</h2>
        <p className="player-rank">Rank: {rank}</p>
        <button className="battle-button" onClick={handleBattle}>Battle ▶</button>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default PlayerDashboard;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AvatarSelectionScreen.css';
import baseURL from './LoginSignup/api';
import avatar1 from './Assets/Avatars/1.png';
import avatar2 from './Assets/Avatars/2.png';
import avatar3 from './Assets/Avatars/3.png';
import avatar4 from './Assets/Avatars/4.png';
import avatar5 from './Assets/Avatars/5.png';
import avatar6 from './Assets/Avatars/6.png';

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

const AvatarSelectionScreen = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const navigate = useNavigate();

  const handleAvatarClick = (index) => {
    setSelectedAvatar(index);
  };

  const handleNextClick = async () => {
    if (selectedAvatar === null) {
      alert('Please select an avatar');
      return;
    }

    // Retrieve the temporary user data
    const tempUserData = JSON.parse(localStorage.getItem('tempUserData'));

    if (!tempUserData) {
      alert('User data not found. Please try signing up again.');
      navigate('/login');
      return;
    }

    // Add the selected avatar to the user data
    const userData = {
      ...tempUserData,
      Avator: (selectedAvatar + 1).toString()  // Changed from Avatar to Avator
    };

    console.log('User data being sent:', userData); // Debug log

    try {
      const response = await fetch(`${baseURL}User/Signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      console.log('API response:', result); // Debug log

      if (response.ok) {
        // Store the user info in local storage
        localStorage.setItem('user-info', JSON.stringify(result));
        // Remove the temporary user data
        localStorage.removeItem('tempUserData');
        // Navigate to battle mode selection
        navigate('/battlemode');
      } else {
        alert(result.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="avatar-selection-screen">
      <h1>CHOOSE AVATAR</h1>
      <div className="avatar-grid">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className={`avatar-container ${selectedAvatar === index ? 'selected' : ''}`}
            onClick={() => handleAvatarClick(index)}
          >
            <img src={avatar} alt={`Avatar ${index + 1}`} />
          </div>
        ))}
      </div>
      <button
        className="next-button"
        disabled={selectedAvatar === null}
        onClick={handleNextClick}
      >
        Next
      </button>
    </div>
  );
};

export default AvatarSelectionScreen;
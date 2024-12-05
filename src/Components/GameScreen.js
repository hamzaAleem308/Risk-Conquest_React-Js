import React from "react";
import { useNavigate } from "react-router-dom";
import "./GameScreen.css";

const GameScreen1 = () => {
  const navigate = useNavigate();

  const goBackToBattleScreen = () => {
    navigate("/battle");
  };

  return (
    <div className="game-screen">
      <button className="back-button" onClick={goBackToBattleScreen}>←</button>
      <div className="content">
        <div className="characters">
          <img
            src="path_to_your_image" // Replace with your image path
            alt="Characters"
            className="characters-image"
          />
        </div>
        <div className="actions">
          <button className="create-game-button">Create Game</button>
          <button className="join-game-button">Friends</button>
          <button className="enter-id-button">Enter Id</button>
        </div>
      </div>
    </div>
  );
};

export default GameScreen1;

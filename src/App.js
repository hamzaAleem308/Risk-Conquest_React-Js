import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BackgroundImageScreen from './Components/LoadingScreen/BackgroundImageScreen.js';
import LoginRegistration from './Components/LoginSignup/LoginRegistration.js';
import AvatarSelectionScreen from './Components/AvatarSelectionScreen.js';
import PlayerDashboard from './Components/playerdashboard/player-dashboard.js';
import BattleModeSelectionScreen from './Components/BattleModeSelectionScreen.js';
import OnlineMultiplayerScreen from './Components/OnlineMultiplayerScreen.js';
import InitialClaiming from './Components/InitialClaiming.js';
import WaitingRoom from './Components/waiting_room.js'
import JoinRoom from './Components/JoinRoom.js';
import JoinRoom2 from './Components/JoinRoom2.js';
import DAF from './Components/DAF.js';
import WinScreen from './Components/WinScreen.js';
import LoseScreen from './Components/LoseScreen.js';
import AsiaInitialClaiming from './Components/AsiaInitialClaiming.js';
import AsiaDaf from './Components/AsiaDaf.js';
function App() {
  return (
    <Router>
      <Routes>                 
         <Route path="/" element={<BackgroundImageScreen />} />
        <Route path="/login" element={<LoginRegistration />} />
        <Route path="/avatar-selection" element={<AvatarSelectionScreen />} />
        <Route path="/dashboard" element={<PlayerDashboard />} />
        <Route path="/battle-mode-selection" element={<BattleModeSelectionScreen />} />
        <Route path="/online-multiplayer" element={<OnlineMultiplayerScreen />} />
        <Route path="/join-room" element={<JoinRoom />} />
        <Route path="/join-room2" element={<JoinRoom2 />} /> 
        <Route path="/Map" element={<InitialClaiming />} /> 
        <Route path="/daf" element={<DAF />} /> 
        <Route path="/Win" element={<WinScreen />} /> 
        <Route path="/Lose" element={<LoseScreen />} />
        <Route path="/mapasia" element= {<AsiaInitialClaiming/>}/>
        <Route path="/asiadaf" element= {<AsiaDaf/>} />
        </Routes>
    </Router>
  );
}

export default App;
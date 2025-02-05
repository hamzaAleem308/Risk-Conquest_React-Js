import React, { useState, useEffect, useRef } from 'react';
import './shared.css';
import { useNavigate, useLocation } from 'react-router-dom';
import baseURL from './LoginSignup/api';
import sideconnection from './Assets/longconnection.png';
import dot from './Assets/dot.png';
// SVG imports (unchanged)
import { ReactComponent as EasternAustralia } from './territories/eastern_australia.svg';
import { ReactComponent as WesternAustralia } from './territories/western_australia.svg';
import { ReactComponent as Indonesia } from './territories/indonesia.svg';
import { ReactComponent as NewGuinea } from './territories/new_guinea.svg';
import { ReactComponent as Siam } from './territories/siam.svg';
import { ReactComponent as India } from './territories/india.svg';
import { ReactComponent as China } from './territories/china.svg';
import { ReactComponent as Mongolia } from './territories/mongolia.svg';
import { ReactComponent as Kamchatka } from './territories/kamchatka.svg';
import { ReactComponent as Irkutsk } from './territories/irkutsk.svg';
import { ReactComponent as Yakutsk } from './territories/yakursk.svg';
import { ReactComponent as Siberia } from './territories/siberia.svg';
import { ReactComponent as Japan } from './territories/japan.svg';
import { ReactComponent as Ural } from './territories/ural.svg';
import { ReactComponent as Afghanistan } from './territories/afghanistan.svg';
import { ReactComponent as MiddleEast } from './territories/middle_east.svg';
import { ReactComponent as Ukraine } from './territories/ukraine.svg';
import { ReactComponent as Scandinavia } from './territories/scandinavia.svg';
import { ReactComponent as NorthernEurope } from './territories/northern_europe.svg';
import { ReactComponent as SouthernEurope } from './territories/southern_europe.svg';
import { ReactComponent as WesternEurope } from './territories/western_europe.svg';
import { ReactComponent as NorthAfrica } from './territories/northafrica.svg';
import { ReactComponent as Egypt } from './territories/egypt.svg';
import { ReactComponent as EastAfrica } from './territories/east_africa.svg';
import { ReactComponent as Congo } from './territories/congo.svg';
import { ReactComponent as SouthAfrica } from './territories/southafrica.svg';
import { ReactComponent as Iceland } from './territories/iceland.svg';
import { ReactComponent as GreatBritain } from './territories/great_britain.svg';
import { ReactComponent as Greenland } from './territories/greenland.svg';
import { ReactComponent as NorthwestTerritory } from './territories/northwest_territory.svg';
import { ReactComponent as Alaska } from './territories/alaska.svg';
import { ReactComponent as Alberta } from './territories/alberta.svg';
import { ReactComponent as Ontario } from './territories/ontario.svg';
import { ReactComponent as WesternUnitedStates } from './territories/western_united_states.svg';
import { ReactComponent as EasternUnitedStates } from './territories/eastern_united_states.svg';
import { ReactComponent as Quebec } from './territories/quebec.svg';
import { ReactComponent as CentralAmerica } from './territories/central_america.svg';
import { ReactComponent as Brazil } from './territories/brazil.svg';
import { ReactComponent as Venezuela } from './territories/venezuela.svg';
import { ReactComponent as Peru } from './territories/peru.svg';
import { ReactComponent as Argentina } from './territories/argentina.svg';
import { ReactComponent as Madagascar } from './territories/madagascar.svg';

import avatar1 from './Assets/Avatars/1.png';
import avatar2 from './Assets/Avatars/2.png';
import avatar3 from './Assets/Avatars/3.png';
import avatar4 from './Assets/Avatars/4.png';
import avatar5 from './Assets/Avatars/5.png';
import avatar6 from './Assets/Avatars/6.png';

// (Your adjacency list stays the same)
const adjacencyList = {
  Eastern_australia: ['Western_australia', 'NewGuinea'],
  Western_australia: ['Eastern_australia', 'Indonesia'],
  Indonesia: ['Western_australia', 'NewGuinea', 'Siam'],
  NewGuinea: ['Eastern_australia', 'Indonesia'],
  Siam: ['Indonesia', 'India', 'China'],
  India: ['Siam', 'China', 'Afghanistan', 'Middleeast'],
  China: ['Siam', 'India', 'Mongolia', 'Ural', 'Siberia'],
  Mongolia: ['China', 'Siberia', 'Irkutsk', 'Kamchatka', 'Japan'],
  Irkutsk: ['Mongolia', 'Siberia', 'Yakursk', 'Kamchatka'],
  Kamchatka: ['Mongolia', 'Irkutsk', 'Yakursk', 'Alaska', 'Japan'],
  Yakursk: ['Irkutsk', 'Kamchatka', 'Siberia'],
  Siberia: ['Ural', 'China', 'Mongolia', 'Irkutsk', 'Yakursk'],
  Japan: ['Mongolia', 'Kamchatka'],
  Ural: ['Ukraine', 'Afghanistan', 'China', 'Siberia'],
  Afghanistan: ['Ural', 'China', 'India', 'Middleeast', 'Ukraine'],
  Middleeast: ['Egypt', 'Southernru', 'Ukraine', 'Afghanistan', 'India', 'EastAfrica'],
  Ukraine: ['Ural', 'Afghanistan', 'Middleeast', 'Southernru', 'Northern_europe', 'Scandinavia'],
  Scandinavia: ['Iceland', 'Greatbritain', 'Northern_europe', 'Ukraine'],
  Northern_europe: ['Greatbritain', 'Western_europe', 'Southernru', 'Ukraine', 'Scandinavia'],
  Southernru: ['Western_europe', 'Northern_europe', 'Middleeast', 'Ukraine'],
  Western_europe: ['Greatbritain', 'Northern_europe', 'Southernru', 'Northafrica'],
  Northafrica: ['Western_europe', 'Brazil', 'Egypt', 'EastAfrica', 'Congo'],
  Egypt: ['Northafrica', 'Middleeast', 'EastAfrica'],
  EastAfrica: ['Egypt', 'Middleeast', 'Congo', 'SouthAfrica', 'Madagascar', 'Northafrica'],
  Congo: ['Northafrica', 'EastAfrica', 'SouthAfrica'],
  SouthAfrica: ['Congo', 'EastAfrica', 'Madagascar'],
  Iceland: ['Greenland', 'Greatbritain', 'Scandinavia'],
  Greatbritain: ['Iceland', 'Scandinavia', 'Northern_europe', 'Western_europe'],
  Greenland: ['NorthWest', 'Ontario', 'Quebec', 'Iceland'],
  NorthWest: ['Alberta', 'Ontario', 'Greenland', 'Alaska'],
  Alaska: ['Kamchatka', 'Alberta', 'NorthWest'],
  Alberta: ['Alaska', 'NorthWest', 'Ontario', 'Western_united_states'],
  Ontario: ['Alberta', 'NorthWest', 'Greenland', 'Quebec', 'Eastern_united_states', 'Western_united_states'],
  Western_united_states: ['Alberta', 'Ontario', 'Eastern_united_states', 'CentralAmerica'],
  Eastern_united_states: ['Ontario', 'Quebec', 'Western_united_states', 'CentralAmerica'],
  Quebec: ['Ontario', 'Greenland', 'Eastern_united_states'],
  CentralAmerica: ['Western_united_states', 'Eastern_united_states', 'Venezuela'],
  Brazil: ['Venezuela', 'Peru', 'Argentina', 'Northafrica'],
  Venezuela: ['CentralAmerica', 'Brazil', 'Peru'],
  Peru: ['Venezuela', 'Brazil', 'Argentina'],
  Argentina: ['Peru', 'Brazil'],
  Madagascar: ['SouthAfrica', 'EastAfrica'],
};

// ─── DAF COMPONENT ─────────────────────────────────────────────
const DAF = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = location.state || {};

  // Local state definitions
  const [players, setPlayers] = useState([]);
  const [currentTurnPlayer, setCurrentTurnPlayer] = useState({
    username: 'Wait',
    Avator: 6,
    Color: 'white',
    PlayerId: -1, 
  });
  const [moveType, setMoveType] = useState('Draft');
  const [troopCount, setTroopCount] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedTargetRegion, setSelectedTargetRegion] = useState(null);
  const [adjacentTerritories, setAdjacentTerritories] = useState([]);
  const [showEndAttackButton, setShowEndAttackButton] = useState(false);
  const [controlledContinents, setControlledContinents] = useState([]);
  const [cardStoring, setcardStoring] = useState([]);
  const [cardModalVisible, setCardModalVisible] = useState(false);
  const [attackerRolls, setAttackerRolls] = useState([]);
  const [defenderRolls, setDefenderRolls] = useState([]);
  const [showDice, setShowDice] = useState(false);
  const [selectedTroop, setSelectedTroop] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [showCustomBox, setShowCustomBox] = useState(false);
  const [customBoxMessage, setCustomBoxMessage] = useState('');
  const [selectedFortifySource, setSelectedFortifySource] = useState(null);
  const [selectedFortifyTarget, setSelectedFortifyTarget] = useState(null);
  const [fortifyAdjacents, setFortifyAdjacents] = useState([]);
  const [availableTroopsForFortify, setAvailableTroopsForFortify] = useState(0);

  const [regions2, setRegions2] = useState({
    Eastern_australia: { color: 'black', text: 0 },
    Western_australia: { color: 'black', text: 0 },
    Indonesia: { color: 'black', text: 0 },
    NewGuinea: { color: 'black', text: 0 },
    Siam: { color: 'black', text: 0 },
    India: { color: 'black', text: 0 },
    China: { color: 'black', text: 0 },
    Mongolia: { color: 'black', text: 0 },
    Irkutsk: { color: 'black', text: 0 },
    Kamchatka: { color: 'black', text: 0 },
    Yakursk: { color: 'black', text: 0 },
    Siberia: { color: 'black', text: 0 },
    Japan: { color: 'black', text: 0 },
    Ural: { color: 'black', text: 0 },
    Afghanistan: { color: 'black', text: 0 },
    Middleeast: { color: 'black', text: 0 },
    Ukraine: { color: 'black', text: 0 },
    Scandinavia: { color: 'black', text: 0 },
    Northern_europe: { color: 'black', text: 0 },
    Southernru: { color: 'black', text: 0 },
    Western_europe: { color: 'black', text: 0 },
    Northafrica: { color: 'black', text: 0 },
    Egypt: { color: 'black', text: 0 },
    EastAfrica: { color: 'black', text: 0 },
    Congo: { color: 'black', text: 0 },
    SouthAfrica: { color: 'black', text: 0 },
    Iceland: { color: 'black', text: 0 },
    Greatbritain: { color: 'black', text: 0 },
    NorthWest: { color: 'black', text: 0 },
    Alaska: { color: 'black', text: 0 },
    Alberta: { color: 'black', text: 0 },
    Ontario: { color: 'black', text: 0 },
    Western_united_states: { color: 'black', text: 0 },
    Eastern_united_states: { color: 'black', text: 0 },
    Quebec: { color: 'black', text: 0 },
    CentralAmerica: { color: 'black', text: 0 },
    Brazil: { color: 'black', text: 0 },
    Venezuela: { color: 'black', text: 0 },
    Peru: { color: 'black', text: 0 },
    Argentina: { color: 'black', text: 0 },
    Madagascar: { color: 'black', text: 0 },
    Greenland: { color: 'black', text: 0 },
  });

  // For positioning lines on the map
  const territoriesRef = useRef({});
  const [territoryPositions, setTerritoryPositions] = useState({});

  const svgMap = {
    Eastern_australia: EasternAustralia,
    Western_australia: WesternAustralia,
    Indonesia: Indonesia,
    NewGuinea: NewGuinea,
    Siam: Siam,
    India: India,
    China: China,
    Mongolia: Mongolia,
    Irkutsk: Irkutsk,
    Kamchatka: Kamchatka,
    Yakursk: Yakutsk,
    Siberia: Siberia,
    Japan: Japan,
    Ural: Ural,
    Afghanistan: Afghanistan,
    Middleeast: MiddleEast,
    Ukraine: Ukraine,
    Scandinavia: Scandinavia,
    Northern_europe: NorthernEurope,
    Southernru: SouthernEurope,
    Western_europe: WesternEurope,
    Northafrica: NorthAfrica,
    Egypt: Egypt,
    EastAfrica: EastAfrica,
    Congo: Congo,
    SouthAfrica: SouthAfrica,
    Iceland: Iceland,
    Greatbritain: GreatBritain,
    NorthWest: NorthwestTerritory,
    Alaska: Alaska,
    Alberta: Alberta,
    Ontario: Ontario,
    Western_united_states: WesternUnitedStates,
    Eastern_united_states: EasternUnitedStates,
    Quebec: Quebec,
    CentralAmerica: CentralAmerica,
    Brazil: Brazil,
    Venezuela: Venezuela,
    Peru: Peru,
    Argentina: Argentina,
    Madagascar: Madagascar,
    Greenland: Greenland,
  };

  // ── Initial useEffect: fetch data and set polling interval ──
  useEffect(() => {
    fetchPlayers();
    fetchTerritory();
    draftTroops();

    const intervalId = setInterval(() => {
      fetchPlayers();
      fetchTerritory();
      fetchState();
      LeaveRoomChecking();
      win();
      lose();
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  // ── Compute territory positions (for drawing attack/fortify lines) ──
  useEffect(() => {
    const newPositions = {};
    for (let name of Object.keys(svgMap)) {
      const el = territoriesRef.current[name];
      if (el) {
        const rect = el.getBoundingClientRect();
        newPositions[name] = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
      }
    }
    setTerritoryPositions(newPositions);
  }, [regions2]);

  // ── Hide custom message box automatically ──
  useEffect(() => {
    let timer;
    if (showCustomBox) {
      timer = setTimeout(() => {
        setShowCustomBox(false);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [showCustomBox]);

  // ── Utility functions ──
  const getAvatarImage = (avatarId) => {
    switch (avatarId) {
      case 1: return avatar1;
      case 2: return avatar2;
      case 3: return avatar3;
      case 4: return avatar4;
      case 5: return avatar5;
      case 6: return avatar6;
      default: return `${process.env.PUBLIC_URL}/Assets/Create.png`;
    }
  };

  const showMessage = (msg) => {
    setCustomBoxMessage(msg);
    setShowCustomBox(true);
  };

  const continentData = {
    NorthAmerica: { territories: ['NorthWest', 'Alaska', 'Alberta', 'Ontario', 'Western_united_states', 'Eastern_united_states', 'Quebec', 'CentralAmerica'] },
    SouthAmerica: { territories: ['Brazil', 'Venezuela', 'Peru', 'Argentina'] },
    Europe: { territories: ['Ukraine', 'Scandinavia', 'Northern_europe', 'Southernru', 'Western_europe', 'Iceland', 'Greatbritain', 'Greenland'] },
    Africa: { territories: ['Northafrica', 'Egypt', 'EastAfrica', 'Congo', 'SouthAfrica', 'Madagascar'] },
    Asia: { territories: ['Indonesia', 'NewGuinea', 'Siam', 'India', 'China', 'Mongolia', 'Irkutsk', 'Kamchatka', 'Yakursk', 'Siberia', 'Japan', 'Ural', 'Afghanistan', 'Middleeast'] },
    Australia: { territories: ['Eastern_australia', 'Western_australia'] },
  };

  // ── Data fetching functions ──
  const fetchPlayers = async () => {
    try {
      const userData = localStorage.getItem('Playerid');
      const response = await fetch(
        `${baseURL}Room/FetchingJoin_p?playerid=${userData}&roomid=${roomId}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
      );
      if (response.ok) {
        const json = await response.json();
        setPlayers(json);
        const youAreActive = json.find(p => p.PlayerId === parseInt(userData) && p.pTurn === 1);
        if (youAreActive) {
          setCurrentTurnPlayer(youAreActive);
        } else {
          const otherActive = json.find(p => p.pTurn === 1);
          if (otherActive) setCurrentTurnPlayer(otherActive);
        }
      } else {
        console.log('Error fetching players');
      }
    } catch (error) {
      console.log('Error fetching players:', error);
    }
  };

  const fetchTerritory = async () => {
    try {
      const response = await fetch(
        `${baseURL}Terrotoriy/GetPla_Territories?roomid=${roomId}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
      );
      const json = await response.json();
      if (response.ok) {
        const updated = { ...regions2 };
        json.forEach(item => {
          const name = item.TerritoryName;
          if (updated[name]) updated[name] = { color: item.Color, text: item.Troops };
        });
        setRegions2(updated);
      } else {
        console.log('Error fetching territories:', json);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const draftTroops = async () => {
    try {
      const userData = localStorage.getItem('Playerid');
      const response = await fetch(
        `${baseURL}Terrotoriy/draftTroopGet?playerid=${userData}&roomid=${roomId}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
      );
      const json = await response.json();
      if (response.ok) setTroopCount(json);
      else console.log('Error drafting troops:', json);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const fetchState = async () => {
    try {
      const response = await fetch(
        `${baseURL}Terrotoriy/fetchMoveState?roomid=${roomId}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
      );
      const json = await response.json();
      if (response.ok) {
        if (json !== 'No Move have been made Yet') {
          const userData = localStorage.getItem('Playerid');
          if (parseInt(json.PlayerId, 10) !== parseInt(userData, 10)) {
            if (json.type === 'Draft') {
              showMessage(`${json.casulaties} Troops Deployed on ${json.Territory_Target}`);
            } else if (json.type === 'Attack') {
              if (json.Success === 'Conquered')
                showMessage(`${json.TerritoryCaptured} was captured by ${json.TerritoryId_Source}`);
              else if (json.Success === 'Failed')
                showMessage(`Attack on ${json.Territory_Target} failed. ${json.casulaties}`);
            } else if (json.type === 'Fortify') {
              if (json.Success === 'Fortified')
                showMessage(`${json.casulaties} troops moved to ${json.Territory_Target}`);
            }
          }
        }
      } else {
        console.log('Error fetching move state:', json);
      }
    } catch (error) {
      console.log('Error fetching move state:', error);
    }
  };

  // ── Main click handler for territories ──
  const handleTerritoryClick = (region) => {
    const userData = localStorage.getItem('Playerid');
    if (currentTurnPlayer.PlayerId !== parseInt(userData))
      return showMessage('Wait for your turn');

    if (moveType === 'Draft') {
      if (troopCount <= 0) {
        showMessage('No more troops to deploy. Attack Phase starts!');
        return setMoveType('Attack');
      }
      if (selectedTroop === 0) return showMessage('Please select troop number first');
      handleDraft(region);
    } else if (moveType === 'Attack') {
      if (!selectedRegion) {
        setSelectedRegion(region);
        showMessage(`You have selected (${region}) as your attacking territory`);
        setAdjacentTerritories(adjacencyList[region] || []);
      } else if (adjacentTerritories.includes(region)) {
        setSelectedTargetRegion(region);
        initiateAttack(selectedRegion, region);
        setSelectedRegion(null);
        setAdjacentTerritories([]);
      } else {
        showMessage('Choose again');
        setSelectedRegion(null);
        setAdjacentTerritories([]);
      }
    } else if (moveType === 'Fortify') {
      if (!selectedFortifySource) {
        if (regions2[region].color !== currentTurnPlayer.Color)
          return showMessage('You can only fortify from your own territory');
        setSelectedFortifySource(region);
        setSelectedRegion(region);
        showMessage(`SOURCE selected: ${region}`);
        setFortifyAdjacents(adjacencyList[region].filter(adjTerr => regions2[adjTerr].color === currentTurnPlayer.Color));
        fetchAvailableFortifyTroops(region);
      } else if (!selectedFortifyTarget) {
        if (!fortifyAdjacents.includes(region))
          return showMessage('Invalid fortify target');
        setSelectedFortifyTarget(region);
        showMessage(`TARGET selected: ${region} - Now choose number of troops`);
        setModalVisible(true);
      }
    }
  };

  const handleDraft = async (region) => {
    try {
      const userData = localStorage.getItem('Playerid');
      const response = await fetch(
        `${baseURL}Terrotoriy/moveDraft?roomid=${roomId}&playerid=${userData}&troops=${selectedTroop}&territorname=${region}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' } }
      );
      const json = await response.json();
      if (response.ok) {
        if (json === 'Territory ALready Occupied')
          showMessage('Territory Already Occupied');
        else if (json === 'Wait For your Turn')
          showMessage('Wait For your Turn');
        else if (json === 'SuccessFully Deployed') {
          const remainTroop = troopCount - selectedTroop;
          setTroopCount(remainTroop);
          if (remainTroop === 0) {
            showMessage('All troops deployed. Attack Phase starts!');
            setMoveType('Attack');
          }
        }
        fetchTerritory();
      } else console.log('Draft error:', json);
    } catch (error) {
      console.log('Draft error:', error);
    }
  };

  const initiateAttack = async (fromTerritory, toTerritory) => {
    const userData = localStorage.getItem('Playerid');
    try {
      const response = await fetch(
        `${baseURL}Terrotoriy/moveAttack?roomid=${roomId}&playerid=${userData}&from=${fromTerritory}&to=${toTerritory}&color=${currentTurnPlayer.Color}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' } }
      );
      const json = await response.json();
      if (response.ok) {
        if (json.message === 'Territory Conquered Successfully') {
          showMessage(`You have successfully captured (${toTerritory})`);
          setMoveType('Fortify');
          setShowEndAttackButton(true);
        } else if (json.message === 'Attack Failed') {
          showMessage(`Attack on ${toTerritory} failed`);
          setShowEndAttackButton(true);
        } else if (json === 'Not enough troops to perform an attack')
          showMessage('Not enough troops to attack');
        else if (json === 'Cannot attack your own territory')
          showMessage('Cannot attack your own territory');
        else if (json === 'You can Not Attack from The Territory That is not Yours')
          showMessage('Territory not yours');
        else if (json === 'Territory Conquered Successfully') {
          showMessage(`Conquered: ${toTerritory}`);
          setMoveType('Fortify');
        } else showMessage(json);
        fetchTerritory();
      } else console.log('Attack error:', json);
    } catch (error) {
      console.log('Attack error:', error);
    }
  };

  const fetchAvailableFortifyTroops = async (region) => {
    try {
      const userData = localStorage.getItem('Playerid');
      const response = await fetch(
        `${baseURL}Terrotoriy/availableTroopFortify?roomid=${roomId}&playerid=${userData}&from=${region}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
      );
      const json = await response.json();
      if (response.ok) setAvailableTroopsForFortify(json);
      else console.log('Error fetching available fortify troops', json);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const initiateFortify = async (fromTerritory, toTerritory, troopsToMove) => {
    try {
      // Get the player id from localStorage
      const userData = localStorage.getItem('Playerid');
      const response = await fetch(
        `${baseURL}Terrotoriy/moveFortify?roomid=${roomId}&playerid=${userData}&from=${fromTerritory}&to=${toTerritory}&troops=${troopsToMove}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      );
  
      const json = await response.json();
  
      if (response.ok) {
        if (json === 'Player Turn Changed') {
          // Show a message and reset fortify-related states
          setCustomBoxMessage('Player Turn Changed');
          setShowCustomBox(true);
          setTimeout(() => setShowCustomBox(false), 4000);
  
          setSelectedFortifySource(null);
          setSelectedFortifyTarget(null);
          setFortifyAdjacents([]);
          setSelectedRegion(null);
          setAvailableTroopsForFortify(0);
          setSelectedTroop(0);
  
          // Proceed to the next phase: change move type and refresh troop count
          setMoveType('Draft');
          setTroopCount(0);
          draftTroops();
  
          // Now, call the getCardForPlayer endpoint to fetch the player's card(s)
          try {
            const userData = localStorage.getItem('Playerid');
            const cardResponse = await fetch(
              `${baseURL}Terrotoriy/getCardForPlayer?roomid=${roomId}&playerid=${userData}`,
              {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
              }
            );
            const cardJson = await cardResponse.json();
            console.log('Card API response:', cardJson);
  
            if (cardResponse.ok) {
              if (cardJson === 'Not Card Availble') {
                console.log('No card available');
              } else {
                setcardStoring(cardJson);
                console.log('Updated cards:', cardJson);
              }
            } else {
              const errorMessage =
                cardJson.message ||
                JSON.stringify(cardJson) ||
                'An error occurred while fetching cards.';
              alert('Error: ' + errorMessage);
            }
          } catch (cardError) {
            setCustomBoxMessage(cardError.message);
            setShowCustomBox(true);
            setTimeout(() => setShowCustomBox(false), 4000);
          }
        }
        // Refresh territory data regardless of fortify outcome
        fetchTerritory();
      } else {
        console.error('Fortify error:', json);
      }
    } catch (error) {
      console.error('Fortify Error:', error);
      setCustomBoxMessage('Fortification error: ' + error.message);
      setShowCustomBox(true);
      setTimeout(() => setShowCustomBox(false), 4000);
    }
  };
  

  const endAttackPhase = () => {
    setMoveType('Fortify');
    setShowEndAttackButton(false);
    showMessage('Attack phase ended. Fortify phase started.');
  };

  // ── Modal components (translated to plain HTML) ──
  const TroopModal = ({ visible, onClose, troopCount, onSelect }) => {
    if (!visible) return null;
    const troopArray = Array.from({ length: troopCount }, (_, i) => i + 1);
    return (
      <div className="troop-modal-overlay">
        <div className="troop-modal-container">
          <div className="troop-list">
            {troopArray.map(item => (
              <div
                key={item}
                className="troop-bubble"
                onClick={() => { onSelect(item); onClose(); }}
              >
                {item.toString().padStart(2, '0')}
              </div>
            ))}
          </div>
          <button onClick={onClose} className="close-button">Close</button>
        </div>
      </div>
    );
  };

  const CardDisplayModal = ({ visible, onClose, cards, onTrade }) => {
    if (!visible) return null;
    return (
      <div className="modal-overlay">
        <div className="modal-container">
          <h2 className="modal-title">Your Cards</h2>
          <div className="card-list" style={{ display: 'flex', overflowX: 'auto' }}>
            {cards.map(item => (
              <div key={item.id} className="card-item">
                <img src={getCardImage(item.cardname)} alt={item.cardname} className="card-image" />
                <p className="card-name">Type: {item.type}</p>
              </div>
            ))}
          </div>
          <button onClick={onTrade} className="trade-button">Trade</button>
          <button onClick={onClose} className="close-button">Close</button>
        </div>
      </div>
    );
  };

  const handleTrade = async () => {
    if (cardStoring.length < 3) {
      alert("Not enough cards: You need at least 3 cards to trade.");
      return;
    }
    const cardCount = {};
    let wildCardCount = 0;
    cardStoring.forEach(card => {
      if (card.type.toLowerCase() === 'wild') wildCardCount++;
      else cardCount[card.type] = (cardCount[card.type] || 0) + 1;
    });
    let selectedTradeType = null;
    let tradedCards = [];
    for (let type in cardCount) {
      if (cardCount[type] >= 3) {
        selectedTradeType = type;
        tradedCards = cardStoring.filter(card => card.type === selectedTradeType).slice(0, 3);
        break;
      }
    }
    if (!selectedTradeType && wildCardCount > 0) {
      for (let type in cardCount) {
        if (cardCount[type] >= 2) {
          selectedTradeType = type;
          tradedCards = cardStoring.filter(card => card.type === selectedTradeType).slice(0, 2);
          tradedCards.push(cardStoring.find(card => card.type.toLowerCase() === 'wild'));
          break;
        }
      }
    }
    if (tradedCards.length !== 3) {
      alert("Invalid Trade: You don't have a valid set of cards to trade.");
      return;
    }
    let troopReward = 0;
    switch (selectedTradeType.toLowerCase()) {
      case 'infantry': troopReward = 4; break;
      case 'cavalry': troopReward = 6; break;
      case 'artillery': troopReward = 8; break;
      default: troopReward = 10; break;
    }
    try {
      const userData = localStorage.getItem("Playerid");
      const response = await fetch(`${baseURL}Terrotoriy/RemoveUsedCards?playerid=${userData}&roomid=${roomId}`, {
        method: 'POST',
        body: JSON.stringify(tradedCards.map(card => card.id)),
        headers: { 'Content-Type': 'application/json' },
      });
      const json = await response.json();
      if (response.ok) {
        setTroopCount(prev => prev + troopReward);
        let newCardStoring = cardStoring.filter(card => !tradedCards.includes(card));
        setcardStoring(newCardStoring);
        alert(`Trade Successful: You received ${troopReward} troops.`);
        setCustomBoxMessage(`Trade Successful, You received ${troopReward} troops.`);
        setShowCustomBox(true);
        await new Promise(resolve => setTimeout(resolve, 4000));
      } else {
        alert("Trade Error: " + (json.message || "Trade failed."));
      }
    } catch (error) {
      alert("Trade Error: Something went wrong: " + (error.message || ""));
    }
  };

  const getCardImage = (cardName) => {
    // Use public folder image paths instead of require()
    switch (cardName) {
      case 'Yakursk': return `${process.env.PUBLIC_URL}/Images/Cards/Yakursk.png`;
      case 'Western_united_states': return `${process.env.PUBLIC_URL}/Images/Cards/Western_united_states.png`;
      case 'Western_europe': return `${process.env.PUBLIC_URL}/Images/Cards/Western_europe.png`;
      case 'Western_australia': return `${process.env.PUBLIC_URL}/Images/Cards/Western_australia.png`;
      case 'Venezuela': return `${process.env.PUBLIC_URL}/Images/Cards/Venezuela.png`;
      case 'Ural': return `${process.env.PUBLIC_URL}/Images/Cards/Ural.png`;
      case 'Ukraine': return `${process.env.PUBLIC_URL}/Images/Cards/Ukraine.png`;
      case 'Southernru': return `${process.env.PUBLIC_URL}/Images/Cards/Southernru.png`;
      case 'SouthAfrica': return `${process.env.PUBLIC_URL}/Images/Cards/SouthAfrica.png`;
      case 'Siberia': return `${process.env.PUBLIC_URL}/Images/Cards/Siberia.png`;
      case 'Siam': return `${process.env.PUBLIC_URL}/Images/Cards/Siam.png`;
      case 'Scandinavia': return `${process.env.PUBLIC_URL}/Images/Cards/Scandinavia.png`;
      case 'Quebec': return `${process.env.PUBLIC_URL}/Images/Cards/Quebec.png`;
      case 'Peru': return `${process.env.PUBLIC_URL}/Images/Cards/Peru.png`;
      case 'Ontario': return `${process.env.PUBLIC_URL}/Images/Cards/Ontario.png`;
      case 'NorthWest': return `${process.env.PUBLIC_URL}/Images/Cards/NorthWest.png`;
      case 'Northern_europe': return `${process.env.PUBLIC_URL}/Images/Cards/Northern_europe.png`;
      case 'Northafrica': return `${process.env.PUBLIC_URL}/Images/Cards/Northafrica.png`;
      case 'NewGuinea': return `${process.env.PUBLIC_URL}/Images/Cards/NewGuinea.png`;
      case 'Mongolia': return `${process.env.PUBLIC_URL}/Images/Cards/Mongolia.png`;
      case 'Middleeast': return `${process.env.PUBLIC_URL}/Images/Cards/Middleeast.png`;
      case 'Madagascar': return `${process.env.PUBLIC_URL}/Images/Cards/Madagascar.png`;
      case 'Kamchatka': return `${process.env.PUBLIC_URL}/Images/Cards/Kamchatka.png`;
      case 'Japan': return `${process.env.PUBLIC_URL}/Images/Cards/Japan.png`;
      case 'Irkutsk': return `${process.env.PUBLIC_URL}/Images/Cards/Irkutsk.png`;
      case 'Indonesia': return `${process.env.PUBLIC_URL}/Images/Cards/Indonesia.png`;
      case 'India': return `${process.env.PUBLIC_URL}/Images/Cards/India.png`;
      case 'Iceland': return `${process.env.PUBLIC_URL}/Images/Cards/Iceland.png`;
      case 'Greenland': return `${process.env.PUBLIC_URL}/Images/Cards/Greenland.png`;
      case 'Greatbritain': return `${process.env.PUBLIC_URL}/Images/Cards/Greatbritain.png`;
      case 'Egypt': return `${process.env.PUBLIC_URL}/Images/Cards/Egypt.png`;
      case 'Eastern_united_states': return `${process.env.PUBLIC_URL}/Images/Cards/Eastern_united_states.png`;
      case 'Eastern_australia': return `${process.env.PUBLIC_URL}/Images/Cards/Eastern_australia.png`;
      case 'EastAfrica': return `${process.env.PUBLIC_URL}/Images/Cards/EastAfrica.png`;
      case 'Congo': return `${process.env.PUBLIC_URL}/Images/Cards/Congo.png`;
      case 'China': return `${process.env.PUBLIC_URL}/Images/Cards/China.png`;
      case 'CentralAmerica': return `${process.env.PUBLIC_URL}/Images/Cards/CentralAmerica.png`;
      case 'Brazil': return `${process.env.PUBLIC_URL}/Images/Cards/Brazil.png`;
      case 'Argentina': return `${process.env.PUBLIC_URL}/Images/Cards/Argentina.png`;
      case 'Alberta': return `${process.env.PUBLIC_URL}/Images/Cards/Alberta.png`;
      case 'Alaska': return `${process.env.PUBLIC_URL}/Images/Cards/Alaska.png`;
      case 'Afghanistan': return `${process.env.PUBLIC_URL}/Images/Cards/Afghanistan.png`;
      default: return `${process.env.PUBLIC_URL}/Images/Create.png`;
    }
  };

  const checkControlledContinents = async () => {
    const playerTerritories = Object.keys(regions2).filter(
      territory => regions2[territory].color === currentTurnPlayer.Color
    );
    const newlyControlledContinents = [];
    for (const [continent, { territories }] of Object.entries(continentData)) {
      if (territories.every(territory => playerTerritories.includes(territory))) {
        if (!controlledContinents.includes(continent))
          newlyControlledContinents.push(continent);
      }
    }
    if (newlyControlledContinents.length > 0) {
      try {
        const userData = localStorage.getItem('Playerid');
        const response = await fetch(
          `${baseURL}Continent/ContinentBonus?playerid=${userData}&continentname=${newlyControlledContinents}`,
          { method: 'GET', headers: { 'Content-Type': 'application/json' } }
        );
        const json = await response.json();
        if (response.ok) {
          if (json.Message === 'Continent found') {
            setTroopCount(prev => prev + json.BonusValue);
            setControlledContinents(prev => [...prev, ...newlyControlledContinents]);
            setCustomBoxMessage(
              `You gained control of ${newlyControlledContinents.join(', ')} and received ${json.BonusValue} additional troops!`
            );
            setShowCustomBox(true);
            await new Promise(resolve => setTimeout(resolve, 4000));
          }
        } else {
          console.error('Backend Error:', json.Message || 'Failed to fetch bonus');
          alert('Error: ' + (json.Message || 'Failed to fetch bonus'));
        }
      } catch (error) {
        console.error('Error:', error.message);
        alert('Error: ' + (error.message || 'Failed to fetch continent bonus'));
      }
    }
  };
// LeaveRoom: Sends a POST request to leave the room.
const LeaveRoom = async () => {
  try {
    const userData = localStorage.getItem('Playerid');
    const response = await fetch(
      `${baseURL}Terrotoriy/LeaveRoom?playerId=${userData}&roomId=${roomId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const json = await response.json();
    console.log(json);
    if (response.ok) {
      if (json === 'You Left The Room') {
        setCustomBoxMessage("You Left");
        setShowCustomBox(true);
        setTimeout(() => setShowCustomBox(false), 2000); // updated to 2000 ms
        navigate('/lose', { state: { roomId } });
      } else if (json === 'Player Left The Room Successfully') {
        // No custom box message is shown here, matching the friend's logic.
        navigate('/main');
      }
    } else {
      const errorMessage =
        json.message ||
        JSON.stringify(json) ||
        'An error occurred while leaving the room.';
      alert('Error: ' + errorMessage);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error: ' + (error.message || 'Unexpected error.'));
  }
};

// LeaveRoomChecking: Sends a GET request to check the room status.
const LeaveRoomChecking = async () => {
  try {
    const userData = localStorage.getItem('Playerid');
    const response = await fetch(
      `${baseURL}Terrotoriy/LeaveRoomChecking?playerId=${userData}&roomid=${roomId}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const json = await response.json();
    if (response.ok) {
      if (json === 'You Won') {
        navigate('/win', { state: { roomId } });
      } else if (json === 'One Player Left The Room') {
        // In the friend's code this branch is empty.
        // Optionally, you can display a message here if needed.
      }
    } else {
      const errorMessage =
        json.message ||
        JSON.stringify(json) ||
        'An error occurred while checking players.';
      alert('Error: ' + errorMessage);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error: ' + (error.message || 'Unexpected error.'));
  }
};

// win: Sends a GET request to check if the player has won.
const win = async () => {
  try {
    const userData = localStorage.getItem('Playerid');
    const response = await fetch(
      `${baseURL}Terrotoriy/CheckWin?playerId=${userData}&roomid=${roomId}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const json = await response.json();
    if (response.ok) {
      if (json === 'You Win') {
        navigate('/win', { state: { roomId } });
      }
    } else {
      const errorMessage =
        json.message ||
        JSON.stringify(json) ||
        'An error occurred while checking win condition.';
      alert('Error: ' + errorMessage);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error: ' + (error.message || 'Unexpected error.'));
  }
};

// lose: Sends a GET request to check if the player has lost.
const lose = async () => {
  try {
    const userData = localStorage.getItem('Playerid');
    const response = await fetch(
      `${baseURL}Terrotoriy/CheckLose?playerId=${userData}&roomid=${roomId}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const json = await response.json();
    if (response.ok) {
      if (json === 'You Lose') {  // updated condition from an empty string to 'You Lose'
        navigate('/lose');
      }
    } else {
      const errorMessage =
        json.message ||
        JSON.stringify(json) ||
        'An error occurred while checking lose condition.';
      alert('Error: ' + errorMessage);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error: ' + (error.message || 'Unexpected error.'));
  }
};

  // ── Dice images and DiceDisplay component ──
  const diceImages = {
    1: `${process.env.PUBLIC_URL}/Images/whiteDice1.png`,
    2: `${process.env.PUBLIC_URL}/Images/whiteDice2.png`,
    3: `${process.env.PUBLIC_URL}/Images/whiteDice3.png`,
    4: `${process.env.PUBLIC_URL}/Images/whiteDice4.png`,
    5: `${process.env.PUBLIC_URL}/Images/whiteDice5.png`,
    6: `${process.env.PUBLIC_URL}/Images/whiteDice6.png`,
  };

  const DiceDisplay = ({ rolls = [] }) => (
    <div className="dice-row">
      {rolls.map((roll, index) => (
        <img key={index} src={diceImages[roll]} alt={`Dice ${roll}`} className="dice-image" />
      ))}
    </div>
  );

  // ── Territory, Player, and Turn components ──
  const TerritoryComponent = ({ name, data }) => {
    const SvgComponent = svgMap[name];
    if (!SvgComponent) return null;
    return (
      <div
        className={`territory-container ${name}`}
        ref={el => (territoriesRef.current[name] = el)}
        onClick={() => handleTerritoryClick(name)}
      >
        <SvgComponent className="territory-svg" style={{ color: data.color }} />
        <div className="territory-info">
          <p>{data.text}</p>
        </div>
      </div>
    );
  };

  const PlayerCard = ({ Avator, username, Rank, Color, Troops }) => {
    const avatarImage = getAvatarImage(Avator);
    return (
      <div className="player-card" style={{ backgroundColor: Color }}>
        <img src={avatarImage} alt="avatar" className="avatar" />
        <div className="player-details">
          <p className="name">{username}</p>
          <p className="rank">{`Rank: ${Rank}`}</p>
          {Troops !== undefined && <p className="troops">Troops: {Troops}</p>}
        </div>
      </div>
    );
  };

  const PlayerTurnCard = ({ Avator, username, Color }) => {
    const avatarImage = getAvatarImage(Avator);
    return (
      <div className="turn-container" style={{ backgroundColor: Color }}>
        <div className="turn-avatar-container">
          <img src={avatarImage} alt="avatar" className="turn-avatar" />
        </div>
        <div className="turn-info-container">
          <p className="turn-draft-text">Move: {moveType}</p>
          <p className="turn-name">Name: {username}</p>
          <p className="turn-number-text">Troops: {troopCount}</p>
        </div>
      </div>
    );
  };

  // When a troop is selected from the modal
  const handleSelectTroop = (num) => {
    setSelectedTroop(num);
    if (moveType === 'Fortify' && selectedFortifySource && selectedFortifyTarget)
      initiateFortify(selectedFortifySource, selectedFortifyTarget, num);
  };

  // ── Main render ──
  return (
    <div className="daf-container">
      <div className="players-section">
        {players.map((p, i) => (
          <PlayerCard
            key={i}
            username={p.username}
            Rank={p.Rank}
            Avator={p.Avator}
            Color={p.Color}
            Troops={p.Troops}
          />
        ))}
      </div>
      <div className="sideconnection">
      <img src={sideconnection} alt="Side Connection" />
      </div>
      <div className="sideconnection2">
      <img src={sideconnection} alt="Side Connection" />
      </div>
      <div>
      <img
        src={dot}
        alt="Second image"
        className="linebrazil"
      />
      <img
        src={dot}
        alt="Second image"
        className="linemad1"
      /><img
        src={dot}
        alt="Second image"
        className="brit1"
      /><img
        src={dot}
        alt="Second image"
        className="brit2"
      /><img
        src={dot}
        alt="Second image"
        className="brit3"
      /><img
        src={dot}
        alt="Second image"
        className="brit4"
      /><img
        src={dot}
        alt="Second image"
        className="egypteu"
      /><img
        src={dot}
        alt="Second image"
        className="brit5"
      /><img
        src={dot}
        alt="Second image"
        className="green"
      /><img
        src={dot}
        alt="Second image"
        className="jap1"
      /><img
        src={dot}
        alt="Second image"
        className="jap2"
      /><img
        src={dot}
        alt="Second image"
        className="linemad2"
      /><img
        src={dot}
        alt="Second image"
        className="middleeastline"
      /><img
        src={dot}
        alt="Second image"
        className="lineindonesia"
      /><img
        src={dot}
        alt="Second image"
        className="siamline"
      /><img
        src={dot}
        alt="Second image"
        className="linenew"
      /><img
        src={dot}
        alt="Second image"
        className="newindo"
      /><img
        src={dot}
        alt="Second image"
        className="westnew"
      />
      </div>
      {Object.keys(regions2).map(regionName => {
        const data = regions2[regionName];
        return <TerritoryComponent key={regionName} name={regionName} data={data} />;
      })}

      <div className="cardIconContainer">
        <button onClick={() => setCardModalVisible(true)} className="card-button">
          Cards
          </button>
      </div>

      <CardDisplayModal
        visible={cardModalVisible}
        onClose={() => setCardModalVisible(false)}
        cards={cardStoring}
        onTrade={handleTrade}
      />

      {showDice && (
        <div className="mainDiceContainer" onClick={() => setShowDice(false)}>
          <div className="attackerContainer">
            <p className="label">Attacker</p>
            <DiceDisplay rolls={attackerRolls} />
          </div>
          <div className="defenderContainer">
            <p className="label">Defender</p>
            <DiceDisplay rolls={defenderRolls} />
          </div>
        </div>
      )}

      <div>
        <button onClick={LeaveRoom} className="back-button">
        ←
        </button>
      </div>

      <div className="player-turn-container">
        <PlayerTurnCard
          username={currentTurnPlayer.username}
          Avator={currentTurnPlayer.Avator}
          Color={currentTurnPlayer.Color}
        />
      </div>

      {selectedRegion && (
        <div className="selected-region-container">
          <p className="region-text">Selected Region: {selectedRegion}</p>
        </div>
      )}

      {selectedRegion && moveType === 'Attack' && (
        <svg className="attack-lines" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L0,7 L10,3.5 z" fill="black" />
            </marker>
          </defs>
          {adjacentTerritories.map(adj => {
            const start = territoryPositions[selectedRegion];
            const end = territoryPositions[adj];
            if (start && end) {
              return (
                <line
                  key={`${selectedRegion}-${adj}`}
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke="black"
                  strokeWidth="3.5"
                  markerEnd="url(#arrowhead)"
                />
              );
            }
            return null;
          })}
        </svg>
      )}

      {moveType === 'Attack' && showEndAttackButton && (
        <button className="attack-button" onClick={endAttackPhase}>
          End Attack
        </button>
      )}

      {selectedFortifySource && selectedFortifyTarget && (
        <svg className="fortify-lines" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <defs>
            <marker id="arrowhead-blue" markerWidth="10" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L0,7 L10,3.5 z" fill="blue" />
            </marker>
          </defs>
          <line
            x1={territoryPositions[selectedFortifySource]?.x}
            y1={territoryPositions[selectedFortifySource]?.y}
            x2={territoryPositions[selectedFortifyTarget]?.x}
            y2={territoryPositions[selectedFortifyTarget]?.y}
            stroke="blue"
            strokeWidth="3.5"
            markerEnd="url(#arrowhead-blue)"
          />
        </svg>
      )}

      {moveType === 'Draft' && (
        <button onClick={() => setModalVisible(true)} className="draft-button">
          Select Troops ({selectedTroop || '0'})
        </button>
      )}

      <TroopModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        troopCount={moveType === 'Fortify' ? availableTroopsForFortify : troopCount}
        onSelect={handleSelectTroop}
      />

      {showCustomBox && (
        <div className="custom-box">
          <p className="custom-box-text">{customBoxMessage}</p>
        </div>
      )}
    </div>
  );
};

export default DAF;

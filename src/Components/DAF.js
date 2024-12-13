import React, { useState, useEffect, useRef } from 'react';
import './DAF.css';
import { useNavigate, useLocation } from 'react-router-dom';
import baseURL from './LoginSignup/api';

// Import SVG territory components as done before
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
import { ReactComponent as SouthernEurope } from './territories/southern_europe.svg';
import { ReactComponent as NorthernEurope } from './territories/northern_europe.svg';
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

const DAF = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = location.state || {};

  const [players, setPlayers] = useState([]);
  const [currentTurnPlayer, setCurrentTurnPlayer] = useState({ username: 'Wait', Avator: 6, Color: 'white' });
  const [moveType, setMoveType] = useState('Draft');
  const [troopCount, setTroopCount] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedTargetRegion, setSelectedTargetRegion] = useState(null);
  const [adjacentTerritories, setAdjacentTerritories] = useState([]);
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
    Kamchatka: Kamchatka,
    Irkutsk: Irkutsk,
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

  useEffect(() => {
    fetchPlayers();
    fetchTerritory();
    draftTroops();
    let intervalId = setInterval(() => {
      fetchPlayers();
      fetchTerritory();
      fetchState();
    }, 15000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Measure territory positions after render
    const newPositions = {};
    for (let name of Object.keys(svgMap)) {
      const el = territoriesRef.current[name];
      if (el) {
        const rect = el.getBoundingClientRect();
        newPositions[name] = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
      }
    }
    setTerritoryPositions(newPositions);
  }, [regions2]); // Recalculate whenever territories update

  const getAvatarImage = (avatarId) => {
    switch (avatarId) {
      case 1:
        return '../Images/Avatar/1.png';
      case 2:
        return '../Images/Avatar/2.png';
      case 3:
        return '../Images/Avatar/3.png';
      case 4:
        return '../Images/Avatar/4.png';
      case 5:
        return '../Images/Avatar/5.png';
      case 6:
        return '../Images/Avatar/6.png';
      default:
        return '../Images/Create.png';
    }
  };

  const fetchPlayers = async () => {
    try {
      const userData = localStorage.getItem('Playerid');
      const response = await fetch(`${baseURL}Room/FetchingJoin_p?playerid=${userData}&roomid=${roomId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        let json = await response.json();
        setPlayers(json);
        const playerTurn = json.find(p => p.PlayerId === parseInt(userData) && p.pTurn === 1);
        if (playerTurn) setCurrentTurnPlayer(playerTurn);
        const otherTurn = json.find(p => p.pTurn === 1 && p.PlayerId !== parseInt(userData));
        if (otherTurn) setCurrentTurnPlayer(otherTurn);
      } else {
        console.log('Error fetching players');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const fetchTerritory = async () => {
    try {
      const response = await fetch(`${baseURL}Terrotoriy/GetPla_Territories?roomid=${roomId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const json = await response.json();
      if (response.ok) {
        const updated = { ...regions2 };
        json.forEach(item => {
          const name = item.TerritoryName;
          if (updated[name]) {
            updated[name] = { color: item.Color, text: item.Troops };
          }
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
      const response = await fetch(`${baseURL}Terrotoriy/draftTroopGet?playerid=${userData}&roomid=${roomId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const json = await response.json();
      if (response.ok) {
        setTroopCount(json);
      } else {
        console.log('Error drafting troops:', json);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const fetchState = async () => {
    try {
      const response = await fetch(`${baseURL}Terrotoriy/fetchMoveState?roomid=${roomId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const json = await response.json();
      if (response.ok) {
        // This can show messages about recent moves by other players
        // Example: if (json.type === 'Attack') { ... }
        // Here you can add alerts or messages based on moves from other players
      } else {
        console.log('Error fetching move state:', json);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleTerritoryClick = async (region) => {
    const userData = localStorage.getItem('Playerid');
    if (currentTurnPlayer.PlayerId !== parseInt(userData)) {
      alert('Wait for your turn');
      return;
    }

    if (moveType === 'Draft') {
      if (troopCount <= 0) {
        alert('No more troops to deploy. Attack Phase starts!');
        setMoveType('Attack');
        return;
      }
      // Deploy a single troop by default
      const troopsToDeploy = 1;
      try {
        const response = await fetch(`${baseURL}Terrotoriy/moveDraft?roomid=${roomId}&playerid=${userData}&troops=${troopsToDeploy}&territorname=${region}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const json = await response.json();
        if (response.ok) {
          if (json === 'Territory ALready Occupied') {
            alert('Territory Already Occupied');
          } else if (json === 'Wait For your Turn') {
            alert('Wait For your Turn');
          } else if (json === 'SuccessFully Deployed') {
            setTroopCount(troopCount - troopsToDeploy);
            if (troopCount - troopsToDeploy === 0) {
              alert('All troops deployed. Attack Phase starts!');
              setMoveType('Attack');
            }
          }
          fetchTerritory();
        } else {
          console.log('Draft error:', json);
        }
      } catch (error) {
        console.log('Draft error:', error);
      }
    } else if (moveType === 'Attack') {
      // Attack logic
      if (!selectedRegion) {
        // Choose source territory
        setSelectedRegion(region);
        alert(`You have selected (${region}) as your attacking territory`);
        const adj = adjacencyList[region];
        setAdjacentTerritories(adj || []);
      } else if (adjacentTerritories.includes(region)) {
        // This is target territory
        setSelectedTargetRegion(region);
        initiateAttack(selectedRegion, region);
        setSelectedRegion(null);
        setAdjacentTerritories([]);
      } else {
        // Invalid selection, reset
        setSelectedRegion(null);
        setAdjacentTerritories([]);
        alert('Choose again');
      }
    } else if (moveType === 'Fortify') {
      // End turn or perform fortify logic
      try {
        const response = await fetch(`${baseURL}Terrotoriy/moveFortify?roomid=${roomId}&playerid=${userData}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const json = await response.json();
        if (response.ok) {
          if (json === 'Player Turn Changed') {
            alert('Your turn ended.');
            setMoveType('Draft');
            setTroopCount(0);
            draftTroops();
          }
        } else {
          console.log('Fortify error:', json);
        }
      } catch (error) {
        console.log('Fortify error:', error);
      }
    }
  };

  const initiateAttack = async (fromTerritory, toTerritory) => {
    const userData = localStorage.getItem('Playerid');
    try {
      const response = await fetch(`${baseURL}Terrotoriy/moveAttack?roomid=${roomId}&playerid=${userData}&from=${fromTerritory}&to=${toTerritory}&color=${currentTurnPlayer.Color}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const json = await response.json();
      if (response.ok) {
        if (json === 'Territory Conquered Successfully') {
          alert(`You have successfully captured (${toTerritory})`);
          setMoveType('Fortify');
        } else {
          alert(json);
        }
        fetchTerritory();
      } else {
        console.log('Attack error:', json);
      }
    } catch (error) {
      console.log('Attack error:', error);
    }
  };

  const PlayerCard = ({ Avator, username, Rank, Color }) => {
    const avatarImage = getAvatarImage(Avator);
    return (
      <div className="player-card" style={{ backgroundColor: Color }}>
        <img src={avatarImage} alt="avatar" className="avatar" />
        <div className="player-details">
          <p className="name">{username}</p>
          <p className="rank">{`Rank: ${Rank}`}</p>
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

  const Territory = ({ name, data }) => {
    const SvgComponent = svgMap[name];
    if (!SvgComponent) return null;
    return (
      <div
        className={`${name}`}
        ref={el => territoriesRef.current[name] = el}
        onClick={() => handleTerritoryClick(name)}
      >
        <SvgComponent
          style={{
            width: '100%',
            height: '100%',
            fill: data.color,
          }}
        />
        <div className="territory-info">
          <p>{data.text}</p>
        </div>
      </div>
    );
  };

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
          />
        ))}
      </div>

      {Object.keys(regions2).map((regionName) => (
        <Territory
          key={regionName}
          name={regionName}
          data={regions2[regionName]}
        />
      ))}

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
        <svg className="attack-lines" style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', pointerEvents:'none' }}>
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
    </div>
  );
};

export default DAF;

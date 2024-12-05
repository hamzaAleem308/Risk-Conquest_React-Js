import React, { useState, useEffect } from 'react';
import './Map.css';
import { useNavigate, useLocation, useParams } from 'react-router-dom'; // For getting route params

// Import SVGs as React components
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
import baseURL from './LoginSignup/api';
// Define baseURL
//const baseURL = 'YOUR_BACKEND_API_BASE_URL'; // Replace with your backend API base URL

const Map = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const {  RoomId, players } = location.state || {};
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [move, setMove] = useState('Initial');
  const [player, setPlayers] = useState([]);
  const [currentTurnPlayer, setCurrentTurnPlayer] = useState({
    username: 'Wait',
    Avator: 6, // Default avatar ID
    Color: 'white',
  });

  const [regions, setRegions] = useState({
    EasternAustralia: false,
    WesternAustralia: false,
    Indonesia: false,
    NewGuinea: false,
    Siam: false,
    India: false,
    China: false,
    Mongolia: false,
    Irkutsk: false,
    Kamchatka: false,
    Yakutsk: false,
    Siberia: false,
    Japan: false,
    Ural: false,
    Afghanistan: false,
    MiddleEast: false,
    Ukraine: false,
    Scandinavia: false,
    NorthernEurope: false,
    SouthernEurope: false,
    WesternEurope: false,
    NorthAfrica: false,
    Egypt: false,
    EastAfrica: false,
    Congo: false,
    SouthAfrica: false,
    Iceland: false,
    GreatBritain: false,
    NorthwestTerritory: false,
    Alaska: false,
    Alberta: false,
    Ontario: false,
    WesternUnitedStates: false,
    EasternUnitedStates: false,
    Quebec: false,
    CentralAmerica: false,
    Brazil: false,
    Venezuela: false,
    Peru: false,
    Argentina: false,
    Madagascar: false,
    Greenland: false,
    // Add other regions here
  });

  const [regions2, setRegions2] = useState({
    EasternAustralia: { color: 'black', text: 0 },
    WesternAustralia: { color: 'black', text: 0 },
    Indonesia: { color: 'black', text: 0 },
    NewGuinea: { color: 'black', text: 0 },
    Siam: { color: 'black', text: 0 },
    India: { color: 'black', text: 0 },
    China: { color: 'black', text: 0 },
    Mongolia: { color: 'black', text: 0 },
    Irkutsk: { color: 'black', text: 0 },
    Kamchatka: { color: 'black', text: 0 },
    Yakutsk: { color: 'black', text: 0 },
    Siberia: { color: 'black', text: 0 },
    Japan: { color: 'black', text: 0 },
    Ural: { color: 'black', text: 0 },
    Afghanistan: { color: 'black', text: 0 },
    MiddleEast: { color: 'black', text: 0 },
    Ukraine: { color: 'black', text: 0 },
    Scandinavia: { color: 'black', text: 0 },
    NorthernEurope: { color: 'black', text: 0 },
    SouthernEurope: { color: 'black', text: 0 },
    WesternEurope: { color: 'black', text: 0 },
    NorthAfrica: { color: 'black', text: 0 },
    Egypt: { color: 'black', text: 0 },
    EastAfrica: { color: 'black', text: 0 },
    Congo: { color: 'black', text: 0 },
    SouthAfrica: { color: 'black', text: 0 },
    Iceland: { color: 'black', text: 0 },
    GreatBritain: { color: 'black', text: 0 },
    NorthwestTerritory: { color: 'black', text: 0 },
    Alaska: { color: 'black', text: 0 },
    Alberta: { color: 'black', text: 0 },
    Ontario: { color: 'black', text: 0 },
    WesternUnitedStates: { color: 'black', text: 0 },
    EasternUnitedStates: { color: 'black', text: 0 },
    Quebec: { color: 'black', text: 0 },
    CentralAmerica: { color: 'black', text: 0 },
    Brazil: { color: 'black', text: 0 },
    Venezuela: { color: 'black', text: 0 },
    Peru: { color: 'black', text: 0 },
    Argentina: { color: 'black', text: 0 },
    Madagascar: { color: 'black', text: 0 },
    Greenland: { color: 'black', text: 0 },
    // Add other regions here
  });

  useEffect(() => {
    sendRegionsToBackend();
    // No orientation lock needed in web
  }, []);

  useEffect(() => {
    fetchPlayers();
    const intervalId = setInterval(() => {
      fetchPlayers();
      fetchTerritory();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

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
      let response = await fetch(
        `${baseURL}Room/FetchingJoin_p?playerid=${userData}&roomid=${RoomId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        let json = await response.json();
        setPlayers(json);

        const player = json.find(
          (player) =>
            player.PlayerId === parseInt(userData) && player.pTurn === 1
        );
        if (player) {
          setCurrentTurnPlayer(player);
        }
        const player2 = json.find(
          (player) => player.pTurn === 1 && player.PlayerId !== parseInt(userData)
        );
        if (player2) {
          setCurrentTurnPlayer(player2);
        }
      } else {
        const errorText = await response.text();
        console.error('Failed:', errorText);
        alert('Error fetching players');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching players');
    }
  };

  const sendRegionsToBackend = async () => {
    try {
      const regionArray = Object.keys(regions);
      const response = await fetch(
        `${baseURL}Terrotoriy/PostRegions?roomid=${RoomId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(regionArray),
        }
      );

      let json = await response.json();
      if (response.ok) {
        const apiData = json;
        const updatedRegions = { ...regions2 };
        apiData.forEach((item) => {
          const territoryName = item.TerritoryName;
          if (updatedRegions.hasOwnProperty(territoryName)) {
            updatedRegions[territoryName] = {
              color: item.Color,
              text: item.Troops,
            };
          }
        });
        setRegions2(updatedRegions);
      } else {
        const errorText = await response.text();
        console.error('Failed:', errorText);
        alert('Error sending regions to backend');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending regions to backend');
    }
  };

  const toggleRegion = async (region) => {
    const newRegions = { ...regions };
    // Reset all other regions
    for (let key in newRegions) {
      newRegions[key] = false;
    }
    newRegions[region] = !regions[region];
    setRegions(newRegions);

    if (newRegions[region]) {
      setSelectedRegion(region);
      try {
        const userData = localStorage.getItem('Playerid');
        let response = await fetch(
          `${baseURL}Terrotoriy/ClaimTerritory?playerid=${userData}&roomid=${RoomId}&territorname=${region}&color=${currentTurnPlayer.Color}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        );

        let json = await response.json();
        if (response.ok) {
          if (json === 'Wait For your Turn') {
            alert('Wait For your Turn');
          } else {
            const apiData = json;
            const updatedRegions = { ...regions2 };
            apiData.forEach((item) => {
              const territoryName = item.TerritoryName;
              if (updatedRegions.hasOwnProperty(territoryName)) {
                updatedRegions[territoryName] = {
                  color: item.Color,
                  text: item.Troops,
                };
              }
            });
            setRegions2(updatedRegions);
          }
        } else {
          let errorMsg = 'Failed';
          if (json === 'Player Not Found') {
            errorMsg = 'Player Not Found';
          } else if (json === 'Room Not Found') {
            errorMsg = 'Room Not Found';
          } else if (json === 'Territory Already Occupied') {
            errorMsg = 'Territory Already Occupied';
          } else {
            errorMsg = response.statusText;
          }
          console.error('Error:', errorMsg);
          alert(errorMsg);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error claiming territory');
      }
    } else {
      setSelectedRegion(null);
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
          <p className="turn-draft-text">{`Move: ${move}`}</p>
          <p className="turn-name">{`Turn: ${username}`}</p>
          <p className="turn-number-text">Troops: 1</p>
        </div>
      </div>
    );
  };

  const fetchTerritory = async () => {
    try {
      const response = await fetch(
        `${baseURL}Terrotoriy/GetPla_Territories?roomid=${RoomId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      let json = await response.json();
      if (response.ok) {
        const apiData = json;
        const updatedRegions = { ...regions2 };
        apiData.forEach((item) => {
          const territoryName = item.TerritoryName;
          if (updatedRegions.hasOwnProperty(territoryName)) {
            updatedRegions[territoryName] = {
              color: item.Color,
              text: item.Troops,
            };
          }
        });
        setRegions2(updatedRegions);
      } else {
        let errorMsg = 'Failed';
        if (json === 'No Territories To Show') {
          errorMsg = 'No Territories To Show';
        } else {
          errorMsg = response.statusText;
        }
        console.error('Error:', errorMsg);
        // Optionally alert the user
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching territories');
    }
  };

  // Mapping of territory names to SVG components
  const svgMap = {
    EasternAustralia,
    WesternAustralia,
    Indonesia,
    NewGuinea,
    Siam,
    India,
    China,
    Mongolia,
    Kamchatka,
    Irkutsk,
    Yakutsk,
    Siberia,
    Japan,
    Ural,
    Afghanistan,
    MiddleEast,
    Ukraine,
    Scandinavia,
    SouthernEurope,
    NorthernEurope,
    WesternEurope,
    NorthAfrica,
    Egypt,
    EastAfrica,
    Congo,
    SouthAfrica,
    Iceland,
    GreatBritain,
    NorthwestTerritory,
    Alaska,
    Alberta,
    Ontario,
    WesternUnitedStates,
    EasternUnitedStates,
    Quebec,
    CentralAmerica,
    Brazil,
    Venezuela,
    Peru,
    Argentina,
    Madagascar,
    Greenland,
    // Add other territories here
  };

  const Territory = ({ name, data, onClick }) => {
    const SvgComponent = svgMap[name];
    if (!SvgComponent) return null;

    const isSelected = regions[name]; // Determine if the territory is selected

    return (
      <div
        className={`${name} ${isSelected ? 'selected' : ''}`}
        onClick={() => onClick(name)}
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
    <div className="map-container">
      {/* Players Section */}
      <div className="players-section">
        {players.map((player, index) => (
          <PlayerCard
            key={index}
            username={player.username}
            Rank={player.Rank}
            Avator={player.Avator}
            Color={player.Color}
          />
        ))}
      </div>

      {/* Territories */}
      {Object.keys(regions2).map((regionName) => (
        <Territory
          key={regionName}
          name={regionName}
          data={regions2[regionName]}
          onClick={toggleRegion}
        />
      ))}

      {/* Current Turn Player */}
      <div className="player-turn-container">
        <PlayerTurnCard
          username={currentTurnPlayer.username}
          Avator={currentTurnPlayer.Avator}
          Color={currentTurnPlayer.Color}
        />
      </div>

      {/* Selected Region */}
      {selectedRegion && (
        <div className="selected-region-container">
          <p className="region-text">Selected Region: {selectedRegion}</p>
        </div>
      )}
    </div>
  );
};

export default Map;

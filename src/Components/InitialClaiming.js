import React, { useState, useEffect } from 'react';
import './InitialClaiming.css';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import baseURL from './LoginSignup/api';

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
import avatar1 from './Assets/Avatars/1.png';
import avatar2 from './Assets/Avatars/2.png';
import avatar3 from './Assets/Avatars/3.png';
import avatar4 from './Assets/Avatars/4.png';
import avatar5 from './Assets/Avatars/5.png';
import avatar6 from './Assets/Avatars/6.png';



const InitialClaiming = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const { roomId } = location.state || {};

  const [selectedRegion, setSelectedRegion] = useState(null);
  // Change move to reflect Initial Claiming phase
  const [move, setMove] = useState('Initial Claim');
  const [players, setPlayers] = useState([]);
  const [currentTurnPlayer, setCurrentTurnPlayer] = useState({
    username: 'Wait',
    Avator: 6,
    Color: 'white',
  });

  const [regions, setRegions] = useState({
    Eastern_australia: false,
    Western_australia: false,
    Indonesia: false,
    NewGuinea: false,
    Siam: false,
    India: false,
    China: false,
    Mongolia: false,
    Irkutsk: false,
    Kamchatka: false,
    Yakursk: false,
    Siberia: false,
    Japan: false,
    Ural: false,
    Afghanistan: false,
    Middleeast: false,
    Ukraine: false,
    Scandinavia: false,
    Northern_europe: false,
    Southernru: false,
    Western_europe: false,
    Northafrica: false,
    Egypt: false,
    EastAfrica: false,
    Congo: false,
    SouthAfrica: false,
    Iceland: false,
    Greatbritain: false,
    NorthWest: false,
    Alaska: false,
    Alberta: false,
    Ontario: false,
    Western_united_states: false,
    Eastern_united_states: false,
    Quebec: false,
    CentralAmerica: false,
    Brazil: false,
    Venezuela: false,
    Peru: false,
    Argentina: false,
    Madagascar: false,
    Greenland: false,
  });

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
  const [regionSent, setRegionSent] = useState(false);
  useEffect(() => {
    if(regionSent === false){
    sendRegionsToBackend();
    }
  }, [regionSent]);

  useEffect(() => {
    fetchPlayers();
    let intervalId = setInterval(() => {
      fetchPlayers();
      fetchTerritory();
      checkAllOccupied(); // Check if all territories are claimed
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  const getAvatarImage = (avatarId) => {
    switch (avatarId) {
      case 1:
        return avatar1
      case 2:
        return avatar2
      case 3:
        return avatar3
      case 4:
        return avatar4
      case 5:
        return avatar5
      case 6:
        return avatar6
      default:
        return './Assets/Create.png';
    }
  };

  const fetchPlayers = async () => {
    try {
      const userData = localStorage.getItem('Playerid');
      let response = await fetch(
        `${baseURL}Room/FetchingJoin_p?playerid=${userData}&roomid=${roomId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      if (response.ok) {
        let json = await response.json();
        setPlayers(json);

        const currentP = json.find(
          (p) => p.PlayerId === parseInt(userData) && p.pTurn === 1
        );
        if (currentP) {
          setCurrentTurnPlayer(currentP);
        }
        const otherP = json.find(
          (p) => p.pTurn === 1 && p.PlayerId !== parseInt(userData)
        );
        if (otherP) {
          setCurrentTurnPlayer(otherP);
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
        `${baseURL}Terrotoriy/PostRegions?roomid=${roomId}`,
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
        setRegionSent(true);
      } else {
        setRegionSent(false)
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
    const userData = localStorage.getItem('Playerid');
  
    // Check if it's current player's turn
    if (currentTurnPlayer.PlayerId !== parseInt(userData)) {
      alert('Wait For your Turn');
      return;
    }
  
    // Deselect all other regions, then toggle the chosen one
    const newRegions = { ...regions };
    for (let key in newRegions) {
      newRegions[key] = false;
    }
    newRegions[region] = !regions[region];
    setRegions(newRegions);
  
    if (newRegions[region]) {
      setSelectedRegion(region);
      try {
        // Make the claim territory API call
        const response = await fetch(
          `${baseURL}Terrotoriy/ClaimTerritory?playerid=${userData}&roomid=${roomId}&territorname=${region}&color=${currentTurnPlayer.Color}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          }
        );
  
        const json = await response.json();
        
        if (response.ok) {
          // The API can return strings or a list of territories
          if (json === 'Wait For your Turn') {
            alert('Wait For your Turn');
          } else if (json === 'Territory ALready Occupied') {
            alert('Territory Already Occupied');
          } else {
            // On success, we get an array of updated territories
            console.log('Successfully Occupied!', json);
  
            const updatedRegions = { ...regions2 };
            json.forEach((item) => {                                                                                                                           
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
          // Handle errors returned by the API
          let errorMsg = 'Failed';
          if (json === 'Player Not Found') {
            errorMsg = 'Player Not Found';
          } else if (json === 'room Not Found') {
            errorMsg = 'Room Not Found';
          } else if (json === 'Territory Already Occupied') {
            errorMsg = 'Territory Already Occupied';
          } else {
            errorMsg = response.statusText || 'Error claiming territory';
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
          {/* In initial claiming, troops per selection is typically 1 */}
          <p className="turn-number-text">Troops: 1</p>
        </div>
      </div>
    );
  };

  const fetchTerritory = async () => {
    try {
      const response = await fetch(
        `${baseURL}Terrotoriy/GetPla_Territories?roomid=${roomId}`,
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
        if (json === ' No Territories TO Show') {
          errorMsg = 'No Territories To Show';
        } else {
          errorMsg = response.statusText;
        }
        console.error('Error:', errorMsg);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching territories');
    }
  };

  const checkAllOccupied = async () => {
    try {
      let response = await fetch(`${baseURL}Terrotoriy/Checkoccupied?roomid=${roomId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let json = await response.json();
      if (response.ok) {
        if (json === 'Continue') {
          // Still claiming
        } else if (json === 'All territories are Occupied Moving To Next Phase') {
          alert('All territories are Occupied. Moving To Next Phase');
          // Navigate to DAF (next phase) - adjust route as needed
          navigate('/daf', { state: { roomId } });
        }
      } else {
        console.log(json);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const Territory = ({ name, data, onClick }) => {
    const SvgComponent = svgMap[name];
    if (!SvgComponent) return null;

    const isSelected = regions[name];

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

      {/* {Object.keys(regions2).map((regionName) => (
        <Territory
          key={regionName}
          name={regionName}
          data={regions2[regionName]}
          onClick={toggleRegion}
        />
      ))} */}
      
      {Object.keys(regions2).map((regionName) => {
  const data = regions2[regionName];
  // territoryComponent is your imported SVG for this region
  const TerritoryComponent = svgMap[regionName]; 

  return (
    <div 
      key={regionName}
      className={`territory-container ${regionName}`} 
      // This div is just for positioning. No widths/heights or backgrounds here.
      style={{
        position: 'absolute',
        top: data.top,   // Assume data.top is a coordinate you have set
        left: data.left, // Assume data.left is a coordinate
      }}
      onClick={() => toggleRegion(regionName)}
    >
      <TerritoryComponent style={{ color: data.color }} className="territory-svg" />
      <div className="territory-info">{data.text}</div>
    </div>
  );
})}



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
    </div>
  );
};

export default InitialClaiming;

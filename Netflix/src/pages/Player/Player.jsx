import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "" // Changed typeof to type
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWE5MmQzZTQyMzdhOTQyNWE2Y2NlMmIyZTEyMDU3NCIsIm5iZiI6MTczMDczNDg3NS4yMzI2MjEsInN1YiI6IjY3MjhlNGFiYTcwMmZjYTIyZjBiY2FiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M8Ie_ok0zXpVSTf6H8l4SRovmVxXpLe_0AqEO-3vVJQ'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(data => setApiData(data.results[0])) // Changed response to data
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='player'>
      <img onClick={() =>{
        navigate("/")
      }} src={back_arrow_icon} alt="Back" />
      <iframe
        src={`https://www.youtube.com/embed/${apiData.key}`} // Fixed the URL to include https://
        frameBorder="0" // Changed frameborder to frameBorder
        width="90%"
        height="90%"
        title="Trailer"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p> {/* Changed typeof to type */}
      </div>
    </div>
  );
};

export default Player;

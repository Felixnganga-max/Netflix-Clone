import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWE5MmQzZTQyMzdhOTQyNWE2Y2NlMmIyZTEyMDU3NCIsIm5iZiI6MTczMDczNDg3NS4yMzI2MjEsInN1YiI6IjY3MjhlNGFiYTcwMmZjYTIyZjBiY2FiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M8Ie_ok0zXpVSTf6H8l4SRovmVxXpLe_0AqEO-3vVJQ'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY * 0.5; // Adjust scrolling sensitivity if needed
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(data => setApiData(data.results))
      .catch(err => console.error(err));

    const cardListRef = cardsRef.current;
    if (cardListRef) {
      cardListRef.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (cardListRef) {
        cardListRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/play/${card.id}`} key={index} className="card">
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;

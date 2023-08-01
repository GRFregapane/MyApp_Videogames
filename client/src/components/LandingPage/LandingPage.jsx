import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchVideoGamesPage } from '../actions';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/images/videogame1.jpg';

function LandingPage() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(fetchVideoGamesPage(1));
  };


  return (
    <div 
      className="landing-page"
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
    >
      <div className="landing-page__content">
        <h1 className="landing-page__heading">WELCOME!</h1>
        <p className="landing-page__description">Here you can find information about video games.</p>
        <Link to="/home" onClick={handleClick}>
          <button className="landing-page__cta-button">Get into</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;


import './App.scss';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import LandingPage  from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import GameDetails from './components/GameDetail/GameDetail'
import NavBar from './components/NavBar/NavBar'
import Form from './components/Form/Form';

function App() {
  const { pathname } = useLocation();
  return (
    <div className="App">
      {pathname === "/" ? null: <NavBar/>}
      <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/videogames' element={<Home/>}/>
      <Route path="/videogames/details/:id" element={<GameDetails/>}/>
      <Route path="/videogames/add-videogame" element={<Form/>}/>
      </Routes>
    </div>
  );
}

export default App;

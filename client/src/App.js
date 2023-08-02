import './App.scss';
import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage  from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import GameDetails from './components/GameDetail/GameDetail'
import NavBar from './components/NavBar/NavBar'
import Form from './components/Form/Form';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage}/>
      <Route path='/videogames' component={NavBar}/>
      <Route exact path='/videogames' component={Home}/>
      <Route exact path="/videogames/details/:id" component={GameDetails} />
      <Route exaxt path="/videogames/add-videogame" component={Form}/>
    </div>
  );
}

export default App;

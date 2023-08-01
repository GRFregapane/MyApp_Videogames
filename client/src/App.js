import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import DetailPage from './components/Detail';
import FormPage from './components/FormPage';
import  {fetchVideogamesPage}  from './Reducers/actions';

function App() {
  const dispatch = useDispatch();
  const videoGames = useSelector(state => state.videogames);
  const currentPage = useSelector(state => state.currentPage);

  // Carga la página inicial de videojuegos al montar el componente App
  useEffect(() => {
    dispatch(fetchVideogamesPage(1));
  }, [dispatch]);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/videogame/:id" render={(props) => <DetailPage {...props} videoGames={videoGames} />} />
          <Route exact path="/create" component={FormPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;


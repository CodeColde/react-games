import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from 'components/Home';
import Register from 'components/Register';
import Login from 'components/Login';
import { connect } from 'react-redux';
import { AppState } from 'redux-state';
import { UserLogin } from 'redux-state/login/types';
// import Game from 'components/Game';
import GenreItem from 'components/GenreItem';
import Genre from 'components/Genre';
import GameClass from 'components/GameClass';

interface Props {
  login: UserLogin;
}

const Root: React.FC<Props> = ({ login }) => {

  const loggedIn = login && login.username;

  return (
    <Router>
      <Route exact path="/">
        {loggedIn ? <Redirect to="/browse/"/> : <Login />}
      </Route>
      <Route exact path="/register">
        {loggedIn ? <Redirect to="/browse/"/> : <Register />}
      </Route>
      <Route exact path="/browse">
        {loggedIn ? <Home /> : <Redirect to="/" />}
      </Route>
      <Route exact path="/game"><Redirect to="/" /></Route>
      <Route exact path="/game/:game" sensitive>
        {loggedIn ? ({ match }) => !!match && <GameClass match={match} /> : <Redirect to="/" />}
      </Route>
      <Route exact path="/genre">
        {loggedIn ? <Genre /> : <Redirect to="/" />}
      </Route>
      <Route path="/genre/:genre">
        {loggedIn ? <GenreItem /> : <Redirect to="/" />}
      </Route>
    </Router>
  );
}

export default connect(
  ({ login }: AppState) => ({ login })
)(Root);

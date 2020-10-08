import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Router from './routeWrapper';

import LoginPage from '../pages/login';
import UserPage from '../pages/user';
import MoviePage from '../pages/movies';
import MyMovies from '../pages/myMovies';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Router path="/" exact isPrivate component={MoviePage} />
        <Router path="/movie" exact isPrivate component={MyMovies} />
        <Router path="/login" exact component={LoginPage} />
        <Router path="/cadastro" exact component={UserPage} />
      </Switch>
    </BrowserRouter>
  );
};

import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import Navbar from './components/Navbar';
import SideBar from './components/Sidebar';
import SearchBar from './components/Searchbar.component.jsx';

import HomePage from './pages/homepage/homepage.component';
import AboutPage from './pages/aboutpage/about.component';
import EventPage from './pages/eventpage/eventpage.component';
import OrgPage from './pages/orgpage/orgpage.component';
import GuideLine from './pages/guidelinepage/guideline.component';
import ErrorPage from './pages/errorpage/errorpage.component';

import firebase from 'firebase';
import 'firebase/auth';

const QUERY = gql`
  {
    orgs {
      _id,
      name
    }
  }
`;

export default function App() {
  const [ user, updateUser ] = useState(null);
  const { loading, error, data } = useQuery(QUERY);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        updateUser(() => user);
      } else {
        updateUser(() => null);
      }
    });
  }, []);

  if (loading) return 'Loading...';
  if (error) {
    console.log(error);
  }

  return (
    <ThemeProvider theme={theme}>
      <Navbar user={user} />
      <SearchBar />
      <SideBar/>
      <Router>
        <Route component={error && <ErrorPage />}/>

        <Switch>
          <Route exact path="/events" component={EventPage} />
          <Route exact path="/orgs" component={OrgPage} />
          <Route exact path="/guideline" component={GuideLine} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

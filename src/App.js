import React, { useEffect, useState } from 'react';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import Navbar from './components/Navbar';

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
    return 'Error :(';
  }

  console.log(data.orgs);

  return (
    <ThemeProvider theme={theme}>
      <Navbar 
        user={user} 
      />
      { data.orgs[0].name }
    </ThemeProvider>
  );
}


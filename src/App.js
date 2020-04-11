import React, { useEffect, useState } from 'react';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import Navbar from './components/Navbar';

import firebase from 'firebase';
import 'firebase/auth';

export default function App() {
  const [ user, updateUser ] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        updateUser(() => user);
      } else {
        updateUser(() => null);
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Navbar 
        user={user} 
      />
    </ThemeProvider>
  );
}


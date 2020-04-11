import React, { useState } from 'react';
import {
  Button,
  Divider,
  Dialog,
  DialogContent,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import firebase from 'firebase';
import 'firebase/auth';

const useStyles = makeStyles(theme => ({
  dialogContent: {
    paddingBottom: '15px'
  },
  formInput: {
    margin: '10px auto'
  }
}));

export default function SignInDialog(props) {
  const classes = useStyles();
  const [ email, updateEmail ] = useState('');
  const [ password, updatePassword ] = useState('');

  function signIn(e) {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => console.log('Signed in'))
      .catch(console.log)
  }

  return (
    <Dialog 
      open={props.open} 
      onClose={props.onClose}
      className={classes.dialog}
    >
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h3" gutterBottom>
          Sign in to Projectube
        </Typography>
        <Divider />
        <Typography variant="body1" gutterBottom>
          Welcome to Projectube! Sign in to get more features.
          <br />
          New to Projectube? <a href='#'>Sign up</a>!
        </Typography>
        <form onSubmit={signIn}>
          <TextField 
            className={classes.formInput}
            label='Email' 
            type='email' 
            value={email}
            variant="outlined"
            onChange={e => {e.persist(); updateEmail(e.target.value)}}
            fullWidth
            required 
          />
          <TextField 
            className={classes.formInput}
            label='Password' 
            type='password' 
            value={password}
            variant="outlined"
            onChange={e => {e.persist(); updatePassword(e.target.value)}}
            fullWidth
            required 
          />
          <Button type="submit" color="primary" variant="contained">
            Sign in
          </Button>
        </form>
      </DialogContent>
    </Dialog> 
  );
}

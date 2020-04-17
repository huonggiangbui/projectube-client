import React, { useState } from 'react';

import {
  AppBar,
  Grid,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import { makeStyles } from '@material-ui/styles';

import SignInDialog from './SignInDialog';

import logo from '../logo.jpg';
import avatar from '../default_avatar.png';

import firebase from 'firebase';
import 'firebase/auth';

const useStyles = makeStyles(theme => ({
  logo: {
    maxHeight: '40px',
  },
  navbarActions: {
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',

    '& > div': {
      margin: '0 5px',
      padding: '0',
      background: 'rgba(0, 0, 0, 0.3)',
      borderRadius: '40px',
      transition: 'background 0.2s linear',

      '&:hover': {
        background: 'rgba(0, 0, 0, 0.5)',
      }
    }
  },
  avatar: {
    display: 'inline-block',
    maxHeight: '30px',
    borderRadius: '100%',
    verticalAlign: 'bottom',
  },
  username: {
    display: 'inline-block',
    height: '30px',
    color: 'white',
    lineHeight: '30px',
    paddingLeft: '13px',
    verticalAlign: 'bottom',
  },
  menuItem: {
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.3)',
    }
  },
}));

export default function Navbar(props) {
  const classes = useStyles();

  return (
    <AppBar position='fixed'>
      <Toolbar variant='dense'>
        <Grid container justify="space-between">
          <Grid item xs={3}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <img src={logo} className={classes.logo} alt='Projectube' />
            </IconButton>
          </Grid>

          <Grid item xs={4}>
            <NavbarActions
              user={props.user}
            />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

function NavbarActions(props) {
  const classes = useStyles();
  const [ anchorEl, setAnchorEl ] = useState(null);
  const [ signInDialog, setSignInDialog ] = useState(false);

  if (!props.user) {
    return (
      <div className={classes.navbarActions}>
        <SignInDialog 
          onClose={() => setSignInDialog(false)}
          open={signInDialog} 
        />
        <Button color="inherit" onClick={() => setSignInDialog(true)}>
          Sign in
        </Button>
        <Button color="inherit">
          Sign up
        </Button>
      </div>
    );
  } else {
    const src = props.user.photoURL || avatar;

    function openMenu(e) {
      setAnchorEl(e.currentTarget);
      console.log(e.target.checked);
    }

    function closeMenu(e) {
      setAnchorEl(null);
    }

    return (
      <div className={classes.navbarActions}>
        <div>
          <IconButton>
            <img src={src} className={classes.avatar} alt='Avatar' />
            <Typography variant="h5" className={classes.username}>
              { props.user.displayName || 'User' }
            </Typography>
          </IconButton>
        </div>
        <div>
          <IconButton>
            <NotificationsIcon 
              style={{ 
                color: 'white',
                fontSize: '25px'
              }} 
            />
          </IconButton>
        </div>
        <div>
          <IconButton
            aria-controls="user-menu"
            aria-haspopup='true'
            onClick={openMenu}
          >
            <ArrowDropDownCircleIcon 
              style={{ 
                color: 'white',
                fontSize: '25px'
              }} 
            />
          </IconButton>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            keepMounted
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            open={Boolean(anchorEl)}
            onClose={closeMenu}
          >
            <MenuItem onClick={closeMenu} className={classes.menuItem}>
              Your profile
            </MenuItem>
            <MenuItem 
              onClick={() => firebase.auth().signOut()} 
              className={classes.menuItem}
            >
              Sign out
            </MenuItem>
          </Menu>
        </div>
      </div>
    );
  }
}

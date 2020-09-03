import React from 'react';
import { Link } from "react-router-dom";
import { useStyles } from './sidebar-styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import LoginIcon from '@material-ui/icons/AccountCircle';
import SignupIcon from '@material-ui/icons/PersonAdd';

function Sidebar(props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.toolbar}>
        <IconButton onClick={props.drawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem component={Link} to={'/'} button key="home">
          <ListItemIcon> <HomeIcon /> </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem component={Link} to={'/me/boards'} button key="boards">
          <ListItemIcon> <ListIcon /> </ListItemIcon>
          <ListItemText primary="My Boards" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem component={Link} to={'/login'} button key="login">
          <ListItemIcon> <LoginIcon /> </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem component={Link} to={'/signup'} button key="signup">
          <ListItemIcon> <SignupIcon /> </ListItemIcon>
          <ListItemText primary="Signup" />
        </ListItem>
      </List>
    </>
  );
}

export default Sidebar;

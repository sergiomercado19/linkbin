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
import LoginIcon from '@material-ui/icons/ExitToApp';
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
        <Link to="/">
          <ListItem button key="home">
            <ListItemIcon> <HomeIcon /> </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link to="/me/boards">
          <ListItem button key="boards">
            <ListItemIcon> <ListIcon /> </ListItemIcon>
            <ListItemText primary="My Boards" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to="/login">
          <ListItem button key="login">
            <ListItemIcon> <LoginIcon /> </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        </Link>
        <Link to="/signup">
          <ListItem button key="signup">
            <ListItemIcon> <SignupIcon /> </ListItemIcon>
            <ListItemText primary="Signup" />
          </ListItem>
        </Link>
      </List>
    </>
  );
}

export default Sidebar;

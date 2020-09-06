import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useStyles } from './sidebar-styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import LoginIcon from '@material-ui/icons/AccountCircle';
import SignupIcon from '@material-ui/icons/PersonAdd';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { getSession, endSession } from '../../utils/session';

function Sidebar() {
  const [isOpen, setOpen] = useState(true);
  
  const handleLogout = () => {
    if (getSession.token()) {
      endSession();
    }
  };
  
  const classes = useStyles();

  return (
    <Drawer
      className={isOpen ? classes.drawerOpened : classes.drawerClosed}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {/* Home */}
          <ListItem component={Link} to={'/'} button key="home">
            <ListItemIcon> <HomeIcon /> </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          {/* My Boards */}
          {getSession.token() && (
            <ListItem component={Link} to={'/me/boards'} button key="boards">
              <ListItemIcon> <ListIcon /> </ListItemIcon>
              <ListItemText primary="My Boards" />
            </ListItem>
          )}
        </List>
        <Divider />
        <List>
          {!getSession.token() && (
            <>
              {/* Login */}
              <ListItem component={Link} to={'/login'} button key="login">
                <ListItemIcon> <LoginIcon /> </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>

              {/* Signup */}
              <ListItem component={Link} to={'/signup'} button key="signup">
                <ListItemIcon> <SignupIcon /> </ListItemIcon>
                <ListItemText primary="Signup" />
              </ListItem>
            </>
          )}

          {/* Logout */}
          {getSession.token() && (
            <ListItem button key="logout" onClick={handleLogout}>
              <ListItemIcon> <LogoutIcon /> </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          )}
        </List>
        <div className={classes.spacer}></div>

        {/* Toggle */}
        <Divider />
        <IconButton style={{alignSelf: 'flex-end'}} onClick={() => setOpen(!isOpen)}>
          {isOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
    </Drawer>
  );
}

export default Sidebar;

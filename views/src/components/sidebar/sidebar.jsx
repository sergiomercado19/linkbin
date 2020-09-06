import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { useStyles } from './sidebar-styles';
import {
  List, Divider, ListItem, ListItemIcon, ListItemText,
  Drawer, Toolbar, IconButton
} from '@material-ui/core';
import {
  Home as HomeIcon, List as ListIcon, AccountCircle as LoginIcon,
  PersonAdd as SignupIcon, ExitToApp as LogoutIcon,
  ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon
} from '@material-ui/icons';

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
          {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
    </Drawer>
  );
}

export default Sidebar;

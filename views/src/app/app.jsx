import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useStyles, darkTheme } from './app-styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core';

import Home from '../routes/home';
import Board from '../routes/board';
import NotFound from '../routes/not-found';

import Sidebar from '../components/sidebar';

const drawerWidth = 240;

// These styles could not be extracted to the '-styles' file
const useSidebarStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

function App() {
  const sidebarClasses = useSidebarStyles();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.root}>
        <CssBaseline />

        {/* Navbar */}
        <AppBar
          position="fixed"
          className={clsx(sidebarClasses.appBar, {
            [sidebarClasses.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Linkbin
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [sidebarClasses.drawerOpen]: open,
            [sidebarClasses.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [sidebarClasses.drawerOpen]: open,
              [sidebarClasses.drawerClose]: !open,
            }),
          }}
        >
          <Sidebar drawerClose={handleDrawerClose}/>
        </Drawer>


        {/* Route viewport */}
        <main className={classes.content}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/notfound" component={NotFound} />
            <Route path="/:boardId" component={Board} />
            {/* <Route path="/me/boards" component={} /> */}
          </Switch>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
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
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core';

import Home from '../routes/home';
import MyBoards from '../routes/my-boards';
import Board from '../routes/board';
import Login from '../routes/login';
import Signup from '../routes/signup';
import NotFound from '../routes/not-found';

import Sidebar from '../components/sidebar';

const drawerWidth = 200;

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
  },
}));

function App() {
  const sidebarClasses = useSidebarStyles();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [boardId, setBoardId] = useState('');

  // Sidebar controls
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Set boardId for redirect
    setBoardId(e.target.boardId.value);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.root}>
        <CssBaseline />

        {/* Navbar */}
        <AppBar position="fixed"
          className={clsx(sidebarClasses.appBar, {
            [sidebarClasses.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.grow}>
              Linkbin
            </Typography>

            {/* Searchbar */}
            {boardId && <Redirect to={`/${boardId}`} />}
            <div className={classes.search}>
              <TextField variant="outlined" size="small" name="boardId" placeholder="Lookup board ID" 
                onSubmit={handleSearch} component="form" style={{width: 300}}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            {/* New board */}
            <Button color="inherit" component={Link} to={'/login'}>
              Create board
            </Button>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Drawer variant="permanent"
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
        <main className={classes.grow}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/me/boards" component={MyBoards} exact />
            <Route path="/notfound" component={NotFound} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/signup" component={Signup} exact />
            <Route path="/:boardId" component={Board} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
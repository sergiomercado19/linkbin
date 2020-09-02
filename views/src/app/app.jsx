import React from 'react';
import { useStyles, darkTheme } from './app-styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core';
import {
  Switch,
  Route
} from "react-router-dom";

import Home from '../routes/home';
import Board from '../routes/board';
import NotFound from '../routes/not-found';

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.root}>
        {/* Background */}
        <div className={classes.background}></div>

        {/* Navbar */}
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Linkbin
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>

        {/* Route viewport */}
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/:boardId" component={Board} />
          {/* <Route path="/me/boards" component={} /> */}
          <Route path="/notfound" component={NotFound} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;

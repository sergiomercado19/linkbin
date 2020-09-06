import React from 'react';
import { Link, Switch, Route, withRouter } from "react-router-dom";

import { useStyles, darkTheme } from './app-styles';
import {
  AppBar, Toolbar, Typography, Button, TextField,
  InputAdornment, Avatar, CssBaseline, ThemeProvider
} from '@material-ui/core';
import {
  Search as SearchIcon
} from '@material-ui/icons';

import Home from 'routes/home';
import MyBoards from 'routes/my-boards';
import Board from 'routes/board';
import Login from 'routes/login';
import Signup from 'routes/signup';
import NotFound from 'routes/not-found';

import Sidebar from 'components/sidebar';

function App(props) {  
  const handleSearch = (e) => {
    e.preventDefault();
    // Set boardId for redirect
    const boardId = e.target.boardId.value;
    // Clear searchbox
    e.target.boardId.value = '';
    // Redirect
    props.history.push(`/${boardId}`);
  }

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.root}>
        <CssBaseline />

        {/* Navbar */}
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>

            {/* Logo */}
            <Avatar variant="rounded" src="/favicon.ico" className={classes.logo} component={Link} to={'/'} />

            {/* Title */}
            <Typography variant="h6" noWrap className={classes.title}>
              Linkbin
            </Typography>

            {/* Searchbar */}
            <div className={classes.search}>
              <TextField variant="outlined" size="small" name="boardId" placeholder="Lookup board ID" 
                onSubmit={handleSearch} component="form" 
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
            <Button color="inherit" component={Link} to={'/login'} style={{minWidth: 100, whiteSpace: 'nowrap'}}>
              Create board
            </Button>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Sidebar />

        {/* Route viewport */}
        <main className={classes.content}>
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

export default withRouter(App);
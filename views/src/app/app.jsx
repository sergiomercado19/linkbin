import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { useStyles, darkTheme } from './app-styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';

import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core';

import Home from '../routes/home';
import MyBoards from '../routes/my-boards';
import Board from '../routes/board';
import Login from '../routes/login';
import Signup from '../routes/signup';
import NotFound from '../routes/not-found';

import Sidebar from '../components/sidebar';

function App() {
  const [boardId, setBoardId] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Set boardId for redirect
    setBoardId(e.target.boardId.value);
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

export default App;
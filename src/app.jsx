import React from 'react';
import { useStyles, darkTheme } from './app-styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import InputBox from './components/input-box';
import { ThemeProvider } from '@material-ui/core';

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
              Board
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>

        {/* New link input */}
        <InputBox />

        {/* Content */}
        <Container className={classes.boardSpace}>
          <div>
            Links will be stacked here
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;

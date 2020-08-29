import React from 'react';
import { useStyles } from './app-styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import InputBox from './components/input-box';
import { blue } from '@material-ui/core/colors';

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
      <Container>
        <div style={{marginTop: 64}}>
          Links will be stacked here
        </div>
      </Container>

    </div>
  );
}

export default App;

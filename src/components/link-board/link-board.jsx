import React from 'react';
import { useStyles } from './link-board-styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

function App() {
  const classes = useStyles();

  return (
    <Grid container justify="center" spacing={3}>
      {[0, 1, 2, 3, 4, 5].map((value) => (
        <Grid key={value} item xs={6} md={4} lg={3}>
          <Paper className={classes.paper} />
        </Grid>
      ))}
    </Grid>
  );
}

export default App;
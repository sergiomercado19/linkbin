import React from 'react';
import { useStyles } from './input-box-styles';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3} component="form" className={classes.form}>
        <InputBase
          className={classes.input}
          placeholder="Add a link"
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton color="primary" className={classes.iconButton} aria-label="directions">
          <AddIcon />
        </IconButton>
      </Paper>
    </div>
  );
}

export default App;

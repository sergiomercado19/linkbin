import React from 'react';
import { useStyles } from './input-box-styles';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

function InputBox(props) {
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault()
    props.insertLink(e.target.url.value)
  }

  return (
    <div className={classes.root}>
      <Paper elevation={6} component="form" className={classes.form} onSubmit={handleSubmit}>
        <InputBase
          name="url"
          className={classes.input}
          placeholder="Add a link"
        />
        <IconButton color="primary" className={classes.iconButton}>
          <AddIcon />
        </IconButton>
      </Paper>
    </div>
  );
}

export default InputBox;

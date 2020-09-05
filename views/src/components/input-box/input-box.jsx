import React from 'react';
import { useStyles } from './input-box-styles';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

function InputBox(props) {
  // Pass the link to parent container
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.url.value !== '') {
      props.insertLink(e.target.url.value);
      e.target.url.value = '';
    }
  }
  
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.footer}>
        <Paper elevation={6} component="form" className={classes.form} onSubmit={handleSubmit}>
          <InputBase
            name="url"
            className={classes.input}
            placeholder="Add a link"
          />
          <IconButton type="submit" color="primary" className={classes.iconButton}>
            <AddIcon />
          </IconButton>
        </Paper>
      </div>
    </div>
  );
}

export default InputBox;

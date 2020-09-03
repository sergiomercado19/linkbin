import React, { useState } from 'react';
import { useStyles } from './input-box-styles';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function InputBox(props) {
  const classes = useStyles();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.url.value !== '') {
      props.insertLink(e.target.url.value);
      e.target.url.value = '';
      setIsAlertOpen(true);
    }
  }

  const handleClose = () => {
    setIsAlertOpen(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.footer}>
        {/* Popup */}
        <Snackbar className={classes.popup} open={isAlertOpen} autoHideDuration={4000} onClose={handleClose}>
          <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="info">
            Fetching preview
          </MuiAlert>
        </Snackbar>

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

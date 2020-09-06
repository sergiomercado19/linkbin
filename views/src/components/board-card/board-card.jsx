import React, { useState } from 'react';

import { useStyles } from './board-card-styles';
import {
  Grid, Paper, ButtonBase, Typography, IconButton, Snackbar
} from '@material-ui/core';
import { 
  Close as CloseIcon, Share as ShareIcon, LabelImportant
} from '@material-ui/icons';
import {
  Alert
} from '@material-ui/lab';

import { URL } from 'utils/constants';

function BoardCard(props) {
  const [isPopupOpen, setPopupOpen] = useState(false);

  // Work around to copy a link to the clipboard
  const copyBoard = () => {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = `${URL}/${props.board.id}`;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    // Show popup
    setPopupOpen(true);
  }

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>

        {/* Arrow */}
        <Grid item className={classes.clickable} onClick={() => window.location.href=`/${props.board.id}`}>
          <ButtonBase disableRipple className={classes.image}>
            <LabelImportant style={{height: '75%', width: '75%'}} />
          </ButtonBase>
        </Grid>

        <Grid item xs={12} sm container>
          {/* Info */}
          <Grid item xs container direction="row" alignItems="center" spacing={2} className={classes.clickable} onClick={() => window.location.href=`/${props.board.id}`}>
            <Grid item xs>
              <Typography variant="h3">
                {props.board.title}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid item container direction="column" style={{height: '100%'}}>
              {/* Delete */}
              <IconButton color="primary" className={classes.icon} onClick={() => props.deleteBoard(props.board.id)}>
                <CloseIcon />
              </IconButton>
              
              <div style={{marginTop: 'auto'}}></div>

              {/* Share */}
              <IconButton color="primary" className={classes.icon} onClick={copyBoard}>
                <ShareIcon/>
              </IconButton>

              {/* Copied to clipboard message popup */}
              <Snackbar open={isPopupOpen} autoHideDuration={4000} onClose={handleClosePopup}>
                <Alert elevation={6} variant="filled" onClose={handleClosePopup} severity="info" >
                  Copied to clipboard!
                </Alert>
              </Snackbar>
              
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Paper>
  );
}

export default BoardCard;

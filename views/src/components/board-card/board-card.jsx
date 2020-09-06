import React from 'react';

import { useStyles } from './board-card-styles';
import {
  Grid, Paper, ButtonBase, Typography, IconButton
 } from '@material-ui/core';
import { 
  Close as CloseIcon, Link as LinkIcon, LabelImportant
} from '@material-ui/icons';

import { URL } from 'utils/constants';

function BoardCard(props) {
  // Work around to copy a link to the clipboard
  const copyBoard = () => {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = `${URL}/${props.board.id}`;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>

        {/* Arrow */}
        <Grid item className={classes.clickable} onClick={() => window.location.href=`/${props.board.id}`}>
          <ButtonBase className={classes.image}>
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
              <IconButton color="primary" className={classes.close} onClick={() => props.deleteBoard(props.board.id)}>
                <CloseIcon />
              </IconButton>
              
              <div style={{marginTop: 'auto'}}></div>

              {/* Link */}
              <IconButton color="primary" className={classes.close} onClick={copyBoard}>
                <LinkIcon/>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Paper>
  );
}

export default BoardCard;

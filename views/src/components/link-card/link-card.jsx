import React from 'react';
import { useStyles } from './link-card-styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LinkIcon from '@material-ui/icons/Link';

function LinkCard(props) {
  // Work around to copy a link to the clipboard
  const copyLink = () => {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = props.link.url;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

  const openNewTab = () => { 
    window.open(props.link.url, '_blank'); 
  }

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>

        {/* Thumbnail */}
        <Grid item className={classes.clickable} onClick={openNewTab}>
          <ButtonBase className={classes.image}>
            <img className={classes.img} alt="thumbnail" src={props.link.img} />
          </ButtonBase>
        </Grid>

        <Grid item xs={12} sm container>
          {/* Info */}
          <Grid item xs container direction="column" spacing={2} className={classes.clickable} onClick={openNewTab}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
                {props.link.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {props.link.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {props.link.domain}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid item container direction="column" style={{height: '100%'}}>
              {/* Remove */}
              {props.editable && (
                <IconButton color="primary" className={classes.close} onClick={() => props.removeLink(props.link.url)}>
                  <CloseIcon />
                </IconButton>
              )}
              
              <div style={{marginTop: 'auto'}}></div>

              {/* Link */}
              <IconButton color="primary" className={classes.close} onClick={copyLink}>
                <LinkIcon/>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Paper>
  );
}

export default LinkCard;
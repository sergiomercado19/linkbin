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
  const copyToClipboard = (url) => {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>

        {/* Thumbnail */}
        <Grid item className={classes.clickable} onClick={() => window.location.href=props.link.url}>
          <ButtonBase className={classes.image}>
            <img className={classes.img} alt="thumbnail" src={props.link.url} />
          </ButtonBase>
        </Grid>

        <Grid item xs={12} sm container>
          {/* Info */}
          <Grid item xs container direction="column" spacing={2} className={classes.clickable} onClick={() => window.location.href=props.link.url}>
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
          {/* Close */}
          <Grid item>
            <Grid item container direction="column" style={{height: '100%'}}>
              <IconButton color="primary" className={classes.close}>
                <CloseIcon />
              </IconButton>
              <div style={{marginTop: 'auto'}}></div>
              <IconButton color="primary" className={classes.close} onClick={() => copyToClipboard(props.link.url)}>
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
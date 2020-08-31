import React, { useState } from 'react';
import { useStyles } from './link-board-styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function LinkBoard() {
  const [links, setLinks] = useState([
    {
      title: "Google",
      description: "Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking for.",
      domain: "google.com.au",
      img: "https://www.google.com.au/images/branding/googlelogo/1x/googlelogo_white_background_color_272x92dp.png",
      url: "https://www.google.com.au"
    },
    {
      title: "Facebook - Log In or Sign Up",
      description: "Create an account or log into Facebook. Connect with friends, family and other people you know. Share photos and videos, send messages and get updates.",
      domain: "facebook.com",
      img: "https://www.facebook.com/images/fb_icon_325x325.png",
      url: "https://www.facebook.com"
    },
    {
      title: "Google",
      description: "Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking for.",
      domain: "google.com.au",
      img: "https://www.google.com.au/images/branding/googlelogo/1x/googlelogo_white_background_color_272x92dp.png",
      url: "https://www.google.com.au"
    },
    {
      title: "Facebook - Log In or Sign Up",
      description: "Create an account or log into Facebook. Connect with friends, family and other people you know. Share photos and videos, send messages and get updates.",
      domain: "facebook.com",
      img: "https://www.facebook.com/images/fb_icon_325x325.png",
      url: "https://www.facebook.com"
    },
    {
      title: "Google",
      description: "Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking for.",
      domain: "google.com.au",
      img: "https://www.google.com.au/images/branding/googlelogo/1x/googlelogo_white_background_color_272x92dp.png",
      url: "https://www.google.com.au"
    },
    {
      title: "Facebook - Log In or Sign Up",
      description: "Create an account or log into Facebook. Connect with friends, family and other people you know. Share photos and videos, send messages and get updates.",
      domain: "facebook.com",
      img: "https://www.facebook.com/images/fb_icon_325x325.png",
      url: "https://www.facebook.com"
    },
  ]);

  const classes = useStyles();

  return (
    <Grid container justify="center" spacing={3}>
      {links.map((link) => (
        <Grid key={link.url} item xs={6}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>

              {/* Thumbnail */}
              <Grid item className={classes.clickable} onClick={() => window.location.href=link.url}>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="thumbnail" src={link.url} />
                </ButtonBase>
              </Grid>

              <Grid item xs={12} sm container>
                {/* Info */}
                <Grid item xs container direction="column" spacing={2} className={classes.clickable} onClick={() => window.location.href=link.url}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {link.title}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {link.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {link.domain}
                    </Typography>
                  </Grid>
                </Grid>
                {/* Close */}
                <Grid item>
                  <IconButton color="primary" className={classes.close}>
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>

            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default LinkBoard;
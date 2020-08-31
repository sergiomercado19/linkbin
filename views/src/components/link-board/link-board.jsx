import React, { useState } from 'react';
import { useStyles } from './link-board-styles';
import Grid from '@material-ui/core/Grid';

import LinkCard from '../link-card';

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
          <LinkCard link={link} />
        </Grid>
      ))}
    </Grid>
  );
}

export default LinkBoard;
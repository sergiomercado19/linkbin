import React from 'react';

import { useStyles } from './not-found-styles';
import {
  Typography
} from '@material-ui/core';

function NotFound() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.text}>
        {/* Title */}
        <Typography variant="h1">
          404 
        </Typography>

        {/* Tagline */}
        <Typography variant="h3">
          Board Not Found
        </Typography>
      </div>
    </div>
  );
}

export default NotFound;
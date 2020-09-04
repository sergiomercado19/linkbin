import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useStyles } from './home-styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import {IS_BOARDID_VALID} from '../../utils/constants';

function Home() {
  const [boardId, setBoardId] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (IS_BOARDID_VALID(e.target.boardId.value)) {
      // Set boardId for redirect
      setBoardId(e.target.boardId.value);
    }
  }

  const classes = useStyles();

  if (boardId !== '') {
    return <Redirect to={`/${boardId}`} />
  } else {
    return (
      <div className={classes.root}>
        <div className={classes.text}>
          {/* Title */}
          <Typography variant="h1">
            Linkbin
          </Typography>
  
          {/* Tagline */}
          <Typography variant="subtitle1" style={{marginBottom: 40}}>
            A link pinboard service
          </Typography>
  
          {/* Searchbox */}
          <TextField variant="outlined"
            className={classes.searchbox}
            name="boardId"
            placeholder="Enter board ID"
            component="form"
            onSubmit={handleSearch}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
    );
  }
}

export default Home;

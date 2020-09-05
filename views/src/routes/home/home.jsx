import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useStyles } from './home-styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

function Home() {
  const [boardId, setBoardId] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Set boardId for redirect
    setBoardId(e.target.boardId.value);
  }

  const classes = useStyles();

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
        {boardId && <Redirect to={`/${boardId}`} />}
        <TextField variant="outlined" name="boardId" placeholder="Lookup board ID" 
          className={classes.searchbox} onSubmit={handleSearch} component="form"
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

export default Home;

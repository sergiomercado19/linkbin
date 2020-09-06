import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useStyles } from './home-styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Container from '@material-ui/core/Container';

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
      {/* Showcase */}
      <div className={classes.showcase}>
        <div className={classes.text}>
          {/* Title */}
          <Typography variant="h1" className={classes.title}>
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

      {/* Content */}
      <Container>
        <Typography align="center" className={classes.content}>
          Linkbin is a platform to create 'link boards' and share them with people.
          These 'link boards' consist of a grid of link previews; which can be viewed
          by anyone with a URL/boardID, but only modified by the board owner.
          <br /><br />
          To begin using the platform you can either lookup a board by its ID; or
          alternatively, you can login and create your own board!
        </Typography>
      </Container>
    </div>
  );
}

export default Home;

import React from 'react';
import { useStyles } from './home-styles';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

function Home(props) {

  const handleSearch = (e) => {
    e.preventDefault();
    if (e.target.boardId.value !== '') {
      // Redirect to board
      props.history.push(`/${e.target.boardId.value}`);
    }
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
        <Typography variant="subtitle1">
          A link pinboard service
        </Typography>

        {/* Searchbox */}
        <TextField
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

export default withRouter(Home);
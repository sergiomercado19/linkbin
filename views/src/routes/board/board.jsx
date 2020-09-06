import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom'

import { useStyles } from './board-styles';
import {
  Grid, Container, Typography, Fab, Snackbar
} from '@material-ui/core';
import {
  Share as ShareIcon
} from '@material-ui/icons';
import {
  Alert
} from '@material-ui/lab';

import InputBox from 'components/input-box';
import LinkCard from 'components/link-card';

import apiClient from 'utils/apiClient';
import { getSession, endSession } from 'utils/session';
import { URL } from 'utils/constants';

function Board() {
  let { boardId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [errors, setErrors] = useState([]);
  const [isErrorOpen, setErrorOpen] = useState(false);

  const [board, setBoard] = useState({links: []});

  // Work around to copy a link to the clipboard
  const copyLink = () => {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = `${URL}/${boardId}`;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

  const handleCloseError = () => {
    setErrorOpen(false);
  };

  // After the page renders, load the links
  useEffect(() => {
    setLoading(true);
    apiClient.getLinks(boardId)
      .then((res) => {
        switch (res.status) {
          case 200:
            setBoard(res.data);
            break;
          case 404:
            // Redirect to 404 if board not valid
            if (res.data['errors']) setIsValid(false);
            break;
          default:
            setErrors(res.data.errors);
            setErrorOpen(true);
            break;
        };
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [boardId]); // [boardId] is there to prevent an infinite loading loop

  const insertLink = (linkUrl) => {
    setLoading(true);
    apiClient.insertLink(boardId, linkUrl)
      .then((res) => {
        switch (res.status) {
          case 200:
            // Reload board
            setBoard(res.data);
            break;
          case 403:
            // Unauthorised user
            endSession();
            break;
          default:
            setErrors(res.data.errors);
            setErrorOpen(true);
            break;
        };
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  const removeLink = (linkUrl) => {
    setLoading(true);
    apiClient.removeLink(boardId, linkUrl)
      .then((res) => {
        switch (res.status) {
          case 200:
            // Reload board
            setBoard(res.data);
            break;
          case 403:
            // Unauthorised user
            endSession();
            break;
          default:
            setErrors(res.data.errors);
            setErrorOpen(true);
            break;
        };
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  // Check if this board can be edited by checking
  // if the board owner matches the session email
  const isEditable = getSession.email() && board.owner === getSession.email();

  const classes = useStyles();

  if (isValid) {
    return (
      <Container className={classes.boardSpace}>
        {/* Loading */}
        {isLoading && <div className="spinner-base"><div className="spinner" /></div>}

        {/* Board title */}
        <Typography className={classes.title} variant="h3" align="center">
          {board.title}
        </Typography>

        {/* New link input */}
        {isEditable && <InputBox insertLink={insertLink} />}

        {/* Action */}
        <Fab color="primary" className={classes.shareButton} onClick={copyLink}>
          <ShareIcon />
        </Fab>

        {/* Links */}
        <Grid container justify="center" spacing={3}>
          {/* Fallback text */}
          {board.links.length === 0 && !isLoading && (
            <Typography variant="h6" align="center">
              {"This board looks empty :("}
              <br />
              {!getSession.token() && "If you own this board, login to start adding links!"}
            </Typography>
          )}

          {board.links.map((link) => (
            <Grid key={link.url} item sm={12} md={6}>
              <LinkCard link={link} editable={isEditable} removeLink={removeLink}/>
            </Grid>
          ))}
        </Grid>

        {/* Error message popup */}
        <Snackbar open={isErrorOpen} autoHideDuration={5000} onClose={handleCloseError} style={{paddingBottom: 100}}>
          <Alert elevation={6} variant="filled" onClose={handleCloseError} severity="error" >
            {errors.map((error) => (
              <Typography key={error}>
                {error}
              </Typography>
            ))}
          </Alert>
        </Snackbar>
      </Container>
    );
  } else {
    return <Redirect to="/notfound" />
  }

}

export default Board;
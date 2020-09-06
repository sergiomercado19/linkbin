import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import isEmpty from 'validator/lib/isEmpty';

import { useStyles } from './my-boards-styles';
import {
  Grid, Container, Fab, Button, TextField, Typography,
  Dialog, DialogTitle, DialogActions, DialogContent
} from '@material-ui/core';
import {
  Add as AddIcon
} from '@material-ui/icons';

import BoardCard from 'components/board-card';

import apiClient from 'utils/apiClient';
import { getSession, endSession } from 'utils/session';

function MyBoards() {
  const [isLoading, setLoading] = useState(false);
  const [boards, setBoards] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const [title, setTitle] = useState('');

  // New board modal controls
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  // After the page renders, load the boards
  useEffect(() => {
    getPageContent();
  }, []);

  const getPageContent = () => {
    setLoading(true);
    apiClient.getUserBoards()
    .then((res) => {
      switch (res.status) {
        case 200:
          setBoards(res.data);
          break;
        case 403:
          // Logout user
          endSession();
          break;
        default:
          console.log(res);
          break;
      };
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
  };

  const newBoard = (boardTitle) => {
    setLoading(true);
    apiClient.newBoard(boardTitle)
      .then((res) => {
        switch (res.status) {
          case 201:
            // Add new board to the page
            setBoards(boards => [res.data, ...boards]);
            break;
          case 403:
            // Logout user
            endSession();
            break;
          default:
            console.log(res);
            break;
        };
        handleClose();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    
  }

  const deleteBoard = (boardId) => {
    setLoading(true);
    apiClient.deleteBoard(boardId)
      .then((res) => {
        switch (res.status) {
          case 204:
            // Reload board
            getPageContent();
            break;
          case 403:
            // Logout user
            endSession();
            break;
          default:
            console.log(res);
            break;
        };
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(true);
      });
  }

  const classes = useStyles();

  if (!getSession.token()) {
    // Make this page unviewable when logged out
    return <Redirect to="/" />
  } else {
    return (
      <Container className={classes.boardSpace}>
        {/* Loading */}
        {isLoading && <div className="spinner-base"><div className="spinner" /></div>}

        {/* Boards */}
        <Grid container justify="center" spacing={3}>
          {/* Fallback text */}
          {boards.length === 0 && !isLoading && (
            <Typography variant="h6" align="center">
              To get started, create a new board!
            </Typography>
          )}

          {boards.map((board) => (
            <Grid key={board.id} item xs={12}>
              <BoardCard board={board} deleteBoard={deleteBoard}/>
            </Grid>
          ))}
        </Grid>

        {/* Action */}
        <Fab variant="extended" color="primary" className={classes.addButton} onClick={handleOpen}>
          <AddIcon className={classes.extendedIcon}/>
          New Board
        </Fab>

        {/* Form modal */}
        <Dialog open={isModalOpen} onClose={handleClose}>
          <DialogTitle id="form-dialog-title">Create New Board</DialogTitle>
          <DialogContent>
            <TextField variant="outlined" margin="normal" fullWidth required autoFocus
              type="text" name="title" autoComplete="title" label="Board Title" 
              onChange={(e) => setTitle(e.target.value)}
              error={title !== '' && isEmpty(title)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button disabled={!title} onClick={() => newBoard(title)} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }
}

export default MyBoards;

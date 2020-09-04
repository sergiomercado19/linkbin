import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { useStyles } from './my-boards-styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import BoardCard from '../../components/board-card';

import apiClient from '../../utils/apiClient';
import { getSession, endSession } from '../../utils/session';
import isEmpty from 'validator/lib/isEmpty';

function MyBoards() {
  const [isLoading, setLoading] = useState(false);
  const [boards, setBoards] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');

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
          // TODO: Show errors as a popup
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
            // TODO: Show errors as a popup
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
            // TODO: Show errors as a popup
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
		return <Redirect to="/" />
	} else {
    return (
      <Container className={classes.boardSpace}>
        {/* Loading */}
        {isLoading && <div className="spinner-base"><div className="spinner" /></div>}

        {/* Boards */}
        <Grid container justify="center" spacing={3}>
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
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { useStyles } from './my-boards-styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import BoardCard from '../../components/board-card';

import apiClient from '../../utils/apiClient';

function MyBoards() {
  const [boards, setBoards] = useState([]);
  const [isValid, setIsValid] = useState(true);

  // After the page renders, load the boards
  useEffect(() => {
    getPageContent();
  }, []);

  const getPageContent = () => {
    apiClient.getUserBoards()
    .then((res) => {
      switch (res.status) {
        case 200:
          setBoards(res.data);
          break;
        case 403:
          // Logout user
          localStorage.removeItem('AuthToken');
          break;
        default:
          // TODO: Show errors as a popup
          break;
      };
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const newBoard = (boardTitle) => {
    apiClient.newBoard(boardTitle)
      .then((res) => {
        switch (res.status) {
          case 201:
            // Reload board
            setBoards(res.data);
            break;
          case 403:
            // Logout user
            localStorage.removeItem('AuthToken');
            break;
          default:
            // TODO: Show errors as a popup
            break;
        };
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const deleteBoard = (boardId) => {
    apiClient.deleteBoard(boardId)
      .then((res) => {
        switch (res.status) {
          case 204:
            // Reload board
            getPageContent();
            break;
          case 403:
            // Logout user
            localStorage.removeItem('AuthToken');
            break;
          default:
            // TODO: Show errors as a popup
            break;
        };
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const classes = useStyles();

  if (isValid) {
    return (
      <Container className={classes.boardSpace}>
        {/* Boards */}
        <Grid container justify="center" spacing={3}>
          {boards.map((board) => (
            <Grid key={board.id} item xs={12}>
              <BoardCard board={board} deleteBoard={deleteBoard}/>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  } else {
    return <Redirect to="/notfound" />
  }

}

export default MyBoards;
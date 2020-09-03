import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom'
import { useStyles } from './board-styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import InputBox from '../../components/input-box';
import LinkCard from '../../components/link-card';

import apiClient from '../../utils/apiClient';

function Board() {
  let { boardId } = useParams();
  const [links, setLinks] = useState([]);
  const [isValid, setIsValid] = useState(true);

  // After the page renders, load the links
  useEffect(() => {
    apiClient.getLinks(boardId)
      .then((res) => {
        switch (res.status) {
          case 200:
            setLinks(res.data.links);
            break;
          case 404:
            // Redirect to 404 if board not valid
            if (res.data['errors']) setIsValid(false);
            break;
          default:
            // TODO: Show errors as a popup
            break;
        };
      })
      .catch((error) => {
        console.log(error);
      });;
  }, [boardId]);

  const insertLink = (linkUrl) => {
    apiClient.insertLink(boardId, linkUrl)
      .then((res) => {
        switch (res.status) {
          case 200:
            // Reload board
            setLinks(res.data.links);
            break;
          case 403:
            // TODO: Logout user
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

  const removeLink = (linkUrl) => {
    apiClient.removeLink(boardId, linkUrl)
      .then((res) => {
        switch (res.status) {
          case 200:
            // Reload board
            setLinks(res.data.links);
            break;
          case 403:
            // TODO: Logout user
            break;
          default:
            // TODO: Show errors as a popup
            break;
        };
      })
      .catch((error) => {
        console.log(error);
      });;
  }

  const classes = useStyles();

  if (isValid) {
    return (
      <Container className={classes.boardSpace}>
        {/* New link input */}
        <InputBox insertLink={insertLink} />
  
        {/* Links */}
        <Grid container justify="center" spacing={3}>
          {links.map((link) => (
            <Grid key={link.url} item xs={6}>
              <LinkCard link={link} removeLink={removeLink}/>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  } else {
    return <Redirect to="/notfound" />
  }

}

export default Board;
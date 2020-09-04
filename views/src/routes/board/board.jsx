import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom'
import { useStyles } from './board-styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import InputBox from '../../components/input-box';
import LinkCard from '../../components/link-card';

import apiClient from '../../utils/apiClient';
import { endSession } from '../../utils/session';

function Board() {
  let { boardId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [links, setLinks] = useState([]);
  const [isValid, setIsValid] = useState(true);

  // After the page renders, load the links
  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [boardId]);

  const insertLink = (linkUrl) => {
    setLoading(true);
    apiClient.insertLink(boardId, linkUrl)
      .then((res) => {
        switch (res.status) {
          case 200:
            // Reload board
            setLinks(res.data.links);
            break;
          case 403:
            // Unauthorised user
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
  }

  const removeLink = (linkUrl) => {
    setLoading(true);
    apiClient.removeLink(boardId, linkUrl)
      .then((res) => {
        switch (res.status) {
          case 200:
            // Reload board
            setLinks(res.data.links);
            break;
          case 403:
            // Unauthorised user
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
  }

  const classes = useStyles();

  if (isValid) {
    return (
      <Container className={classes.boardSpace}>
        {/* Loading */}
        {isLoading && <div className="spinner-base"><div className="spinner" /></div>}

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
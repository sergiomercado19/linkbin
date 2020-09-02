import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom'

import InputBox from '../../components/input-box';
import LinkCard from '../../components/link-card';

import apiClient from '../../utils/apiClient';

function Board() {
  let { boardId } = useParams();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    apiClient.getLinks(boardId)
      .then((res) => {
        // Load board if id is found
        if (!res['error']) setLinks(res.links);
      });
  }, [boardId]);

  const insertLink = (linkUrl) => {
    apiClient.insertLink(boardId, linkUrl)
      .then((res) => {
        // Reload parent
        setLinks(res.links);
      });
  }

  const removeLink = (linkUrl) => {
    apiClient.removeLink(boardId, linkUrl)
      .then((res) => {
        // Reload parent
        setLinks(res.links);
      });
  }

  return (
    <>
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
    </>
  );
}

export default Board;
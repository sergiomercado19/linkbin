import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom'

import InputBox from '../input-box';
import LinkCard from '../link-card';

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
  }, []);

  return (
    <>
      {/* New link input */}
      <InputBox />

      {/* Links */}
      <Grid container justify="center" spacing={3}>
        {links.map((link) => (
          <Grid key={link.url} item xs={6}>
            <LinkCard link={link} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Board;
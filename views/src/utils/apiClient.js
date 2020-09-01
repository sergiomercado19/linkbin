import {
  POST_BOARD_URL, DELETE_BOARD_URL, LINKS_URL
} from './constants';

/////////
// BOARDS
/////////

const newBoard = () => {
  const url = POST_BOARD_URL();
  const client = getClient('POST');
  return apiCall(url, client);
};

const deleteBoard = (boardId) => {
  const url = DELETE_BOARD_URL(boardId);
  const client = getClient('DELETE');
  return apiCall(url, client);
};

////////
// LINKS
////////

const getLinks = (boardId) => {
  const url = LINKS_URL(boardId);
  const client = getClient('GET');
  return apiCall(url, client);
};

const insertLink = (boardId, linkUrl) => {
  const url = LINKS_URL(boardId);
  const client = getClient('PUT', `url=${linkUrl}`);
  return apiCall(url, client);
};

const removeLink = (boardId, linkUrl) => {
  const url = LINKS_URL(boardId);
  const client = getClient('DELETE', `url=${linkUrl}`);
  return apiCall(url, client);
};

//////////
// HELPERS
//////////

const apiCall = async (url, options, convertToJson = true) => {
  let res = await fetch(url, options);
  if (convertToJson) res = await res.json();
  return res;
};

const getClient = (method, body) => {
  const client = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  };
  // Get user token from cookies/local storage
  // if (token) headers.Authorization = `Bearer ${token}`;
  if (body) client.body = body;
  return client;
};


const apiClient = {
  newBoard,
  deleteBoard,
  getLinks,
  insertLink,
  removeLink
};
export default apiClient;

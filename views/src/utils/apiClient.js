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
  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  var body = new URLSearchParams();
  body.append('url', linkUrl);

  const url = LINKS_URL(boardId);
  const client = getClient('DELETE', headers, body);
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

const getClient = (method, headers, body) => {
  const defaultHeaders = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  
  const client = {
    method,
    headers: headers || defaultHeaders,
    body: body || null
  };
  // Get user token from cookies/local storage
  // if (token) headers.Authorization = `Bearer ${token}`;
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

import {
  GET_BOARDS_URL, POST_BOARD_URL, DELETE_BOARD_URL,
  LINKS_URL, LOGIN_URL, SIGNUP_URL
} from './constants';

/////////
// BOARDS
/////////

const getUserBoards = () => {
  const url = GET_BOARDS_URL();
  const client = getClient('GET');
  return apiCall(url, client);
};

const newBoard = (boardTitle) => {
  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  var body = new URLSearchParams();
  body.append('title', boardTitle);

  const url = POST_BOARD_URL();
  const client = getClient('POST', headers, body);
  return apiCall(url, client);
};

const deleteBoard = (boardId) => {
  const url = DELETE_BOARD_URL(boardId);
  const client = getClient('DELETE');
  return apiCall(url, client, false);
};

////////
// LINKS
////////

const getLinks = (boardId) => {
  const url = LINKS_URL(boardId);
  const client = getClient('GET', null, null, false);
  return apiCall(url, client);
};

const insertLink = (boardId, linkUrl) => {
  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  var body = new URLSearchParams();
  body.append('url', linkUrl);

  const url = LINKS_URL(boardId);
  const client = getClient('PUT', headers, body);
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

///////
// AUTH
///////

const login = (email, password) => {
  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  var body = new URLSearchParams();
  body.append('email', email);
  body.append('password', password);

  const url = LOGIN_URL;
  const client = getClient('POST', headers, body);
  return apiCall(url, client);
};

const signup = (form) => {
  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  var body = new URLSearchParams();
  body.append('firstName', form.firstName);
  body.append('lastName', form.lastName);
  body.append('email', form.email);
  body.append('password', form.password);
  body.append('confirmPassword', form.confirmPassword);

  const url = SIGNUP_URL;
  const client = getClient('POST', headers, body);
  return apiCall(url, client);
};

//////////
// HELPERS
//////////

const apiCall = async (url, options, convertToJson = true) => {
  let data = await fetch(url, options);
  const status = data.status;
  if (convertToJson) data = await data.json();
  return {status, data};
};

const getClient = (method, header, body, needToken = true) => {
  const defaultHeaders = new Headers();
  defaultHeaders.append('Accept', 'application/json');
  defaultHeaders.append('Content-Type', 'application/json');

  const headers = header || defaultHeaders;
  // Get user token from local storage
  let token = localStorage.getItem('AuthToken');
  if (needToken) headers.append('Authorization', token);
  
  const client = {
    method,
    headers,
    body: body || null
  };
  return client;
};


const apiClient = {
  getUserBoards,
  newBoard,
  deleteBoard,
  getLinks,
  insertLink,
  removeLink,
  login,
  signup
};
export default apiClient;

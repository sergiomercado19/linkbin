import {
  POST_BOARD_URL, DELETE_BOARD_URL, LINKS_URL,
  LOGIN_URL, SIGNUP_URL
} from './constants';

/////////
// BOARDS
/////////

const newBoard = (boardTitle) => {
  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  var body = new URLSearchParams();
  body.append('title', boardTitle);

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
  let token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjUxMDM2YWYyZDgzOWE4NDJhZjQzY2VjZmJiZDU4YWYxYTc1OGVlYTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGlua2Jpbi1hZWE5YiIsImF1ZCI6ImxpbmtiaW4tYWVhOWIiLCJhdXRoX3RpbWUiOjE1OTkxMzEwMDMsInVzZXJfaWQiOiI0UXRJN1NNS0p5T1NuMWRsZVBFSU9IOXBGZUozIiwic3ViIjoiNFF0STdTTUtKeU9TbjFkbGVQRUlPSDlwRmVKMyIsImlhdCI6MTU5OTEzMTAwMywiZXhwIjoxNTk5MTM0NjAzLCJlbWFpbCI6InRlc3QzQGVtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0M0BlbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.s_n7hNiW98LinfsUw8YWkYBsA6c2u4JJqyCuR4t20z0j5DccIj0903pfQvR_7YCY4wk-z4KpzJWROnA-WJw1xVSLi0vhuGuNdVNRnJi4mWV-PjPZNgrHxR2-FB0DBl5WpdEFObhL1U9i4kPTYESpsQQHiWQZfl4Z5OEk1WkJOnV-6xOR0hd0lGj1sdohfzNf2qjp71xhoMNEnkcTMTBbfh5CmbPERRi5tI-KLfKlni1Qzja5IzGCxQVgOYvJvUMy4W6isMSfpizchouzrku7DLTu5IUUE2u9vIiFU8P-W1grhu7msYCx6N67ZuvZBsR6cfuWbTbXgSRGqXNApVS-7Q";
  if (needToken) headers.append('Authorization', `Bearer ${token}`);
  
  const client = {
    method,
    headers,
    body: body || null
  };
  return client;
};


const apiClient = {
  newBoard,
  deleteBoard,
  getLinks,
  insertLink,
  removeLink,
  login,
  signup
};
export default apiClient;

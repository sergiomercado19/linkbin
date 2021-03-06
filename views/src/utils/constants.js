export const IN_DEVELOPMENT = false;

export const DEVELOP_URL = 'http://localhost:3000/linkbin-aea9b/us-central1';
export const DEVELOP_API_URL = 'http://localhost:5000/linkbin-aea9b/us-central1/api';

export const DEPLOY_URL = 'https://linkbin-aea9b.web.app';
export const DEPLOY_API_URL = 'https://us-central1-linkbin-aea9b.cloudfunctions.net/api';

export const URL = IN_DEVELOPMENT ? DEVELOP_URL : DEPLOY_URL;
export const API_URL = IN_DEVELOPMENT ? DEVELOP_API_URL : DEPLOY_API_URL;


export const GET_BOARDS_URL = () => `${API_URL}/boards/me`;
export const POST_BOARD_URL = () => `${API_URL}/boards`;
export const DELETE_BOARD_URL = (id) => `${API_URL}/boards/${id}`;
export const LINKS_URL = (id) => `${API_URL}/boards/${id}/links`;
export const LOGIN_URL = `${API_URL}/login`;
export const SIGNUP_URL = `${API_URL}/signup`;

// From: https://stackoverflow.com/questions/52850099/what-is-the-reg-expression-for-firestore-constraints-on-document-ids
// Regex matches Firestore's auto generated IDs
export const IS_BOARDID_VALID = (boardId) => /^(?!\.\.?$)(?!.*__.*__)([^/]{20})$/.test(boardId);

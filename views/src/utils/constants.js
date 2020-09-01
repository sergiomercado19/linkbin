export const IN_DEVELOPMENT = true;

export const DEVELOP_URL = 'http://localhost:5000/linkbin-aea9b/us-central1/api';
export const DEPLOY_URL = 'https://us-central1-linkbin-aea9b.cloudfunctions.net/api';
export const URL = IN_DEVELOPMENT ? DEVELOP_URL : DEPLOY_URL;

export const POST_BOARD_URL = () => `${URL}/boards`;
export const DELETE_BOARD_URL = (id) => `${URL}/boards/${id}`;
export const LINKS_URL = (id) => `${URL}/boards/${id}/links`;

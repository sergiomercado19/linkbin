export const getSession = () => {
  return localStorage.getItem('AuthToken');
};

export const startSession = (token) => {
  localStorage.setItem('AuthToken', `Bearer ${token}`);
  window.location.reload();
};

export const endSession = () => {
  localStorage.removeItem('AuthToken');
  window.location.reload();
};

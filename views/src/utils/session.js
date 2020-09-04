export const getSession = () => {
  return localStorage.getItem('AuthToken');
};

export const startSession = (token) => {
  localStorage.setItem('AuthToken', `Bearer ${token}`);
};

export const endSession = () => {
  localStorage.removeItem('AuthToken');
};

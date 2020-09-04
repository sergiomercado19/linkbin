export const getSession = { 
  token: () => localStorage.getItem('AuthToken'),
  email: () => localStorage.getItem('Email'),
};

export const startSession = (token, email) => {
  localStorage.setItem('AuthToken', `Bearer ${token}`);
  localStorage.setItem('Email', email);
  window.location.reload();
};

export const endSession = () => {
  localStorage.removeItem('AuthToken');
  localStorage.removeItem('Email');
  window.location.reload();
};

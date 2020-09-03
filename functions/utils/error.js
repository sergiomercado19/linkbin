exports.boardError = {
  invalidId: 'Invalid board ID',
  createFail: 'Database failed to create board',
  deleteFail: 'Database failed to delete board',
};

exports.linkError = {
  invalidUrl: 'Invalid link URL',
  puppeteer: 'Puppeteer failed to get preview',
  insertFail: 'Database failed to insert link',
  removeFail: 'Database failed to remove link',
};

exports.authError = {
  unauth: 'Unauthorized',
  notFound: 'User not found',
  invalidToken: 'Invalid token',
  wrongCred: 'Wrong credentials',
};

exports.userError = {
  lookupFail: 'Database failed to lookup user',
  signupFail: 'Authentication server failed to signup user',
  takenEmail: 'Email has already been registered',
  invalidEmail: 'Email is invalid',
  emptyEmail: 'Email field cannot be empty',
  emptyPassword: 'Password field cannot be empty',
  emptyFirstName: 'FirstName field cannot be empty',
  emptyLastName: 'LastName field cannot be empty',
  diffPasswords: 'Passwords do not match',
};

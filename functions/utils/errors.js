// API error library
//
// These error messages were made readable to be displayed
// in the frontend during a failed validation.

exports.boardError = {
  invalidId: 'Invalid board ID',
  createFail: 'Database failed to create board',
  deleteFail: 'Database failed to delete board',
};

exports.linkError = {
  invalidUrl: 'Invalid link URL',
  emptyUrl: 'URL field cannot be empty',
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
  signupFailAuth: 'Authentication service failed to signup user',
  signupFailDb: 'Database service failed to register user',
  sagaCompFail: 'Failed to compensate saga transaction, user is in inconsistent state',
  takenEmail: 'Email has already been registered',
  invalidEmail: 'Email is invalid',
  emptyEmail: 'Email field cannot be empty',
  emptyPassword: 'Password field cannot be empty',
  emptyFirstName: 'FirstName field cannot be empty',
  emptyLastName: 'LastName field cannot be empty',
  weakPassword: 'Password should be at least 6 characters',
  diffPasswords: 'Passwords do not match',
};

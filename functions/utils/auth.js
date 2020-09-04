// Authentication Middleware
//
// This is a generator that yields on every auth attempt.

const { admin, db } = require('./admin');
const { authError } = require('../utils/errors');

module.exports = async (request, response, next) => {
  let idToken;
  
  // Extract bearer token from 'Authorization' header
  if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
    idToken = request.headers.authorization.split('Bearer ')[1];
  } else {
    return response.status(403).json({ errors: [authError.unauth] });
  }

  try {
    // Verify token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    request.user = decodedToken;
    // Get user's data from the database
    const userData = await db.collection('users').where('userId', '==', request.user.uid).limit(1).get();
    // Store user's email to be used by API handlers
    request.user.email = userData.docs[0].data().email;
    return next();
  } catch (err) {
    console.error('Error while verifying token', err);
    return response.status(403).json({ errors: [authError.invalidToken] });
  }
};

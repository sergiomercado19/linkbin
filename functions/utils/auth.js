const { admin, db } = require('./admin');
const { authError } = require('../utils/error');

module.exports = async (request, response, next) => {
	let idToken;
	if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
		idToken = request.headers.authorization.split('Bearer ')[1];
	} else {
		return response.status(403).json({ errors: [authError.unauth] });
  }
  
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    request.user = decodedToken;
    const userData = await db.collection('users').where('userId', '==', request.user.uid).limit(1).get();
    request.user.email = userData.docs[0].data().email;
    return next();
  } catch (err) {
    console.error('Error while verifying token', err);
    return response.status(403).json({ errors: [authError.invalidToken] });
  }
};
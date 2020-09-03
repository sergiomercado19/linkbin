const firebase = require('firebase');
const { admin, db } = require('../utils/admin');
const config = require('../utils/config');
const { validateLoginData, validateSignUpData } = require('../utils/validators');

firebase.initializeApp(config);

// Login
exports.loginUser = (request, response) => {
  const user = {
    email: request.body.email,
    password: request.body.password
  }

  const { errors, valid } = validateLoginData(user);
	if (!valid) return response.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
        return data.user.getIdToken();
    })
    .then((token) => {
        return response.json({ token });
    })
    .catch((error) => {
        console.error(error);
        return response.status(403).json({ error: 'Wrong credentials'});
    })
};
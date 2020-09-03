const firebase = require('firebase');
const { admin, db } = require('../utils/admin');
const config = require('../utils/config');
const { validateLoginData, validateSignupData, errMessages } = require('../utils/validators');

firebase.initializeApp(config);

// Get user
exports.getUser = (request, response) => {
  let userData = {};
  db.collection('users').doc(request.user.email).get()
    .then((doc) => {
      if (doc.exists) {
        userData.userCredentials = doc.data();
        return response.json(userData);
      } else {
        return response.status(404).json({ error: errMessages.userNotFound });
      }
    })
    .catch((error) => {
      console.error(error);
      return response.status(500).json({ error: errMessages.dunno });
    });
}

// Login
exports.loginUser = (request, response) => {
  const user = {
    email: request.body.email,
    password: request.body.password
  }

  const { errors, valid } = validateLoginData(user);
	if (!valid) return response.status(400).json({ error: errors });

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
      return response.status(403).json({ error: errMessages.wrongCred});
    })
};

// Signup
exports.signupUser = (request, response) => {
  const newUser = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
  };

  const { valid, errors } = validateSignupData(newUser);

  if (!valid) return response.status(400).json({ error: errors });

  let token, userId;
  db
    .collection('users').doc(newUser.email).get()
    .then((doc) => {
      if (doc.exists) {
        return response.status(400).json({ error: errMessages.takenEmail });
      } else {
        return firebase.auth().createUserWithEmailAndPassword(
          newUser.email, 
          newUser.password
        );
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idtoken) => {
      token = idtoken;
      const userCredentials = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId
      };
      return db.collection('users')
        .doc(newUser.email)
        .set(userCredentials);
    })
    .then(() => {
      return response.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        return response.status(400).json({ error: errMessages.takenEmail });
      } else {
        return response.status(500).json({ error: errMessages.dunno });
      }
    });
}
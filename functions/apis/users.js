// Users API handlers
// - getUser
// - loginUser
// - signupUser

const firebase = require('firebase');
const { admin, db } = require('../utils/admin');
const { validateLoginData, validateSignupData } = require('../utils/validators');
const { authError, userError } = require('../utils/errors');

// .gitignore'd file containing the config variables
const config = require('../utils/config');
// Initalize Firebase's Authentication service
firebase.initializeApp(config);

/**
 * Gets a single user's account information
 * @param   {String} request.user.email Email is passed in during authentication.
 * @return  {User} user.data() - All data related to a user, stored in the database.
 */
exports.getUser = async (request, response) => {
  let userData = {};

  try {
    const user = await db.collection('users').doc(request.user.email).get();
    if (user.exists) {
      userData.userCredentials = user.data();
      return response.json(userData);
    } else {
      return response.status(404).json({ errors: [authError.notFound] });
    }
  } catch (err) {
    console.error(err);
    return response.status(500).json({ errors: [userError.lookupFail] });
  }
}

/**
 * Login a user
 * @param   {String} request.body.email Email address from form data.
 * @param   {String} request.body.password Password from form data.
 * @return  {String} token - JWT token provide by Firebase's Authentication service.
 * @return  {String} email - Email linked to this user.
 */
exports.loginUser = async (request, response) => {
  const user = {
    email: request.body.email,
    password: request.body.password
  }

  // Validate POST data
  const { errors, valid } = validateLoginData(user);
  if (!valid) return response.status(400).json({ errors: errors });

  try {
    const authData = await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
    const token = await authData.user.getIdToken();
    // Return token and email
    return response.json({ token, email: user.email });
  } catch (err) {
    console.error(err);
    return response.status(403).json({ errors: [authError.wrongCred] });
  }
};

/**
 * Signup a user
 * @param   {String} request.body.firstName First name from form data.
 * @param   {String} request.body.lastName Last name from form data.
 * @param   {String} request.body.email Email address from form data.
 * @param   {String} request.body.password Password from form data.
 * @param   {String} request.body.confirmPassword Password confirmation from form data.
 * @return  {String} token - JWT token provide by Firebase's Authentication service.
 * @return  {String} email - Email linked to this user.
 */
exports.signupUser = async (request, response) => {
  const newUser = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
  };

  // Validate POST data
  const { errors, valid } = validateSignupData(newUser);
  if (!valid) return response.status(400).json({ errors: errors });

  let token, userId;

  // Saga (part 1): Authentication service signup
  try {
    const user = await db.collection('users').doc(newUser.email).get().catch((err) => {
      console.error(err);
      return response.status(500).json({ errors: [userError.lookupFail] });
    });

    // Check if email is taken
    if (user.exists) return response.status(409).json({ errors: [userError.takenEmail] });

    // Create user on Firebase's authentication service
    const userCred = await firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
    userId = userCred.user.uid;
    const idToken = await userCred.user.getIdToken();
    token = idToken;
  } catch (error) {
    console.error(error);
    if (error.code === 'auth/email-already-in-use')
      return response.status(409).json({ errors: [userError.takenEmail] });
    else 
      return response.status(500).json({ errors: [userError.signupFailAuth] });
  }

  // Saga (part 2): Database service registration
  try {
    // Create user credentials object
    const userCredentials = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      createdAt: new Date().toISOString(),
      userId
    };
    // Store user credentials in database
    await db.collection('users').doc(newUser.email).set(userCredentials);
    // Return token and email
    return response.status(201).json({ token, email: newUser.email });
  } catch (error) {
    let errors = [userError.signupFailDb];

    // Compensate saga (part 1)
    await admin.auth().deleteUser(userId).catch(() => {errors.push(userError.sagaCompFail)});
    
    console.error(error);
    return response.status(500).json({ errors: errors });
  }
}

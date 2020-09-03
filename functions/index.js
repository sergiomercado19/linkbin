const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');

const auth = require('./utils/auth');

// Enable CORS
app.use(cors());

// Boards
const { newBoard, deleteBoard } = require('./apis/boards');
app.post('/boards', auth, newBoard);
app.delete('/boards/:id', auth, deleteBoard);

// Links
const { getLinks, insertLink, removeLink } = require('./apis/links');
app.get('/boards/:id/links', getLinks);
app.put('/boards/:id/links', auth, insertLink);
app.delete('/boards/:id/links', auth, removeLink);

// Users
const { loginUser, signupUser, getUser } = require('./apis/users');
app.post('/login', loginUser);
app.post('/signup', signupUser);
app.get('/user', auth, getUser);

exports.api = functions.https.onRequest(app);

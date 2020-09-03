const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');

// Enable CORS
app.use(cors());

// Boards
const { newBoard, deleteBoard } = require('./apis/boards');
app.post('/boards', newBoard);
app.delete('/boards/:id', deleteBoard);

// Links
const { getLinks, insertLink, removeLink } = require('./apis/links');
app.get('/boards/:id/links', getLinks);
app.put('/boards/:id/links', insertLink);
app.delete('/boards/:id/links', removeLink);

// Users
const { loginUser } = require('./apis/users');
app.post('/login', loginUser);

exports.api = functions.https.onRequest(app);

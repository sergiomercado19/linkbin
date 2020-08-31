const functions = require('firebase-functions');
const app = require('express')();

// Boards
const { getBoard, newBoard, deleteBoard } = require('./apis/boards')
app.get('/board', getBoard);
app.post('/board', newBoard);
app.delete('/board', deleteBoard);

// Links
const { insertLink, removeLink } = require('./apis/links')
app.put('/link', insertLink);
app.delete('/link', removeLink);

exports.api = functions.https.onRequest(app);

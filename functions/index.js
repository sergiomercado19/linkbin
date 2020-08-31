const functions = require('firebase-functions');
const app = require('express')();

const { getLinks, insertLink, removeLink } = require('./apis/links')

app.get('/links', getLinks);
app.put('/link', insertLink);
app.delete('/link', removeLink);
exports.api = functions.https.onRequest(app);

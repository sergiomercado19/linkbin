// Link API handlers
// - getLinks
// - insertLink
// - removeLink

const { db } = require('../utils/admin');
const { boardError, linkError, authError } = require('../utils/errors');

const linkPreviewGenerator = require("link-preview-generator");

/**
 * Gets all the links in a given board
 * @param   {String} request.params.id Board ID is obtained from the URL param.
 * @return  {Board} board.data() - All data from the given board.
 */
exports.getLinks = async (request, response) => {
  const boardRef = db.collection('boards').doc(request.params.id);
  const board = await boardRef.get();

  if (!board.exists) {
    return response.status(404).json({ errors: [boardError.invalidId] });
  } else {
    return response.json(board.data());
  }
}

/**
 * Inserts a link in a given board
 * @param   {String} request.body.url Inserted URL link.
 * @param   {String} request.params.id Board ID is obtained from the URL param.
 * @param   {String} request.user.email Email is passed in during authentication.
 * @return  {Board} board.data() - All data from the given board, including the link just inserted.
 */
exports.insertLink = async (request, response) => {
  if (!request.body.url) {
    return response.status(404).json({ errors: [linkError.emptyUrl] });
  }

  const url = request.body.url.trim();
  if (url === '') {
    return response.status(404).json({ errors: [linkError.invalidUrl] });
  }

  const boardRef = db.collection('boards').doc(request.params.id);
  let board = await boardRef.get();
  let boardData = board.data();

  // Check if user owns the board
  if (boardData.owner !== request.user.email) {
    return response.status(403).json({ errors: [authError.unauth] });
  }

  // Check if link is already on board
  let found = boardData.links.reduce((total, curr) => {
    return total || curr.url === url;
  }, false);

  if (found) {
    // Do nothing, return original board
    return response.json(boardData); 
  }
  
  // Puppeteer flags to improve performance
  const puppeteerArgs = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--no-first-run',
    '--no-zygote',
    '--single-process',
    '--disable-gpu'
  ];
  // Get Link preview from URL
  try {
    const newLink = await linkPreviewGenerator(url, puppeteerArgs);
    newLink.url = url;
    // Insert URL link
    boardData.links.push(newLink);
    // Update lastModified time
    boardData.lastModified = Date.now();
  } catch (err) {
    return response.status(500).json({ errors: [linkError.puppeteer] });
  }

  return boardRef.update(boardData)
    .then(() => {
      // Return updated board, containing the inserted link
      return response.json(boardData);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ errors: [linkError.insertFail] });
    });
};

/**
 * Removes a link in a given board
 * @param   {String} request.body.url Inserted URL link.
 * @param   {String} request.params.id Board ID is obtained from the URL param.
 * @param   {String} request.user.email Email is passed in during authentication.
 * @return  {Board} board.data() - All data from the given board, without the removed link.
 */
exports.removeLink = async (request, response) => {
  const url = request.body.url.trim();
  if (url === '') {
    return response.status(404).json({ errors: [linkError.invalidUrl] });
  }

  const boardRef = db.collection('boards').doc(request.params.id);
  let board = await boardRef.get();
  let boardData = board.data();

  // Check if user owns the board
  if (boardData.owner !== request.user.email) {
    return response.status(403).json({ errors: [authError.unauth] });
  }
  
  // Remove link
  let index = boardData.links.length - 1;
  while (index >= 0) {
    if (boardData.links[index].url === url)
      boardData.links.splice(index, 1);
    index -= 1;
  }

  // Update lastModified time
  boardData.lastModified = Date.now();

  return boardRef.update(boardData)
    .then(() => {
      // Return updated board, with the link removed
      return response.json(boardData);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ errors: [linkError.removeFail] });
    });
};

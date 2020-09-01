const { db } = require('../utils/admin');
const linkPreviewGenerator = require("link-preview-generator");

// getLinks - gets all the links in a given board
exports.getLinks = async (request, response) => {
  const boardRef = db.collection('boards').doc(request.params.id);
  const board = await boardRef.get();

  if (!board.exists) {
    console.log('No such board!');
    return response.status(404).json({ error: 'Invalid board ID' });
  } else {
    return response.json(board.data());
  }
}

// insertLink - adds a link to a given board
exports.insertLink = async (request, response) => {
  const url = request.body.url.trim();
	if (url === '') {
		return response.status(404).json({ error: 'Invalid URL' });
  }

  const boardRef = db.collection('boards').doc(request.params.id);
  let board = await boardRef.get();
  let boardData = board.data();

  // Check if link is already on board
  let found = boardData.links.reduce((total, curr) => {
    return total || curr.url === url;
  }, false);

  if (found) {
    // Do nothing, return original
    return response.json(boardData); 
  }
  
  // Get Link preview from URL
  const newLink = await linkPreviewGenerator(url, ['--no-sandbox']);
  newLink['url'] = url;

  // Insert link, return new
  boardData.links.push(newLink);
  return boardRef.update(boardData)
    .then(() => {
      return response.json(boardData);
    })
    .catch((err) => {
			console.error(err);
			return response.status(500).json({ error: 'Something went wrong' });
		});
};

// removeLink - removes a link from a given board
exports.removeLink = async (request, response) => {
  const url = request.body.url.trim();
	if (url === '') {
		return response.status(404).json({ error: 'Invalid URL' });
  }

  const boardRef = db.collection('boards').doc(request.params.id);
  let board = await boardRef.get();
  let boardData = board.data();
  
  // Remove link, return new
  let index = boardData.links.length - 1;
  while (index >= 0) {
    if (boardData.links[index].url === url)
      boardData.links.splice(index, 1);
    index -= 1;
  }
  return boardRef.update(boardData)
    .then(() => {
      return response.json(boardData);
    })
    .catch((err) => {
			console.error(err);
			return response.status(500).json({ error: 'Something went wrong' });
		});
};

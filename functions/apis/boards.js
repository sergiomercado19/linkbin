const { db } = require('../utils/admin');

// newBoard - create new board with a random id
exports.newBoard = async (request, response) => {
  const boardRef = await db.collection('boards').add({ links: [] });
  const board = await boardRef.get();

  if (!board.exists) {
    console.log('Failed to create board');
    return response.status(404).json({ error: 'Something went wrong' });
  } else {
    return response.json(board.data());
  }
}

// deleteBoard - delete a board
exports.deleteBoard = async (request, response) => {
  const boardRef = db.collection('boards').doc(request.params.id);
  const board = await boardRef.get();

  if (!board.exists) {
    console.log('No such board!');
    return response.status(404).json({ error: 'Invalid board ID' });
  }

  return boardRef.delete()
    .then(() => {
      return response.end();
    })
    .catch((err) => {
			console.error(err);
			return response.status(500).json({ error: 'Something went wrong' });
		});
}

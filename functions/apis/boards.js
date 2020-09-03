const { db } = require('../utils/admin');
const { errMessages } = require('../utils/validators');

// newBoard - create new board with a random id
exports.newBoard = async (request, response) => {
  const newBoardItem = {
    links: [],
    owner: request.user.email,
  };

  const boardRef = await db.collection('boards').add(newBoardItem);
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

  // Check if board exists
  if (!board.exists) {
    return response.status(404).json({ error: 'Invalid board ID' });
  }

  // Check if user owns the board
  if (board.data().owner === request.user.email) {
    return response.status(404).json({ error: errMessages.unauth });
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

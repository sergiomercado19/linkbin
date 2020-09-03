const { db } = require('../utils/admin');
const { boardError, authError } = require('../utils/errors');

// newBoard - create new board with a random id
exports.newBoard = async (request, response) => {
  const newBoardItem = {
    links: [],
    owner: request.user.email,
  };

  const boardRef = await db.collection('boards').add(newBoardItem);
  const board = await boardRef.get();

  if (!board.exists) {
    return response.status(500).json({ errors: [boardError.createFail] });
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
    return response.status(404).json({ errors: [boardError.invalidId] });
  }

  // Check if user owns the board
  if (board.data().owner === request.user.email) {
    return response.status(404).json({ errors: [authError.unauth] });
  }

  return boardRef.delete()
    .then(() => {
      return response.end();
    })
    .catch((err) => {
			console.error(err);
			return response.status(500).json({ errors: [boardError.deleteFail] });
		});
}

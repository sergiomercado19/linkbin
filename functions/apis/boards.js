const { db } = require('../utils/admin');
const { boardError, authError } = require('../utils/errors');

// newBoard - create new board with a random id
exports.getUserBoards = async (request, response) => {
  const query = db.collection('boards').where('owner', '==', request.user.email);
  const results = await query.get();

  let boards = [];
  results.forEach((board) => {
    // Get data from the document
    let data = board.data();
    // Add the boardId to each result
    data.id = board.id;
    boards.push(data)
  });

  // Sort board by lastModified timestamp
  boards.sort((a, b) => {
    const keyA = a.lastModified;
    const keyB = b.lastModified;
    // Compare the 2 dates
    if (keyA > keyB) return -1;
    if (keyA < keyB) return 1;
    return 0;
  });

  return response.json(boards);
}

// newBoard - create new board with a random id
exports.newBoard = async (request, response) => {
  const newBoardItem = {
    links: [],
    title: request.body.title,
    owner: request.user.email,
    createdAt: Date.now(),
    lastModified: Date.now(),
  };

  const boardRef = await db.collection('boards').add(newBoardItem);
  const board = await boardRef.get();

  if (!board.exists) {
    return response.status(500).json({ errors: [boardError.createFail] });
  } else {
    // Add the boardId to the new board
    let newBoard = board.data();
    newBoard.id = board.id;
    return response.status(201).json(newBoard);
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
  if (board.data().owner !== request.user.email) {
    return response.status(403).json({ errors: [authError.unauth] });
  }

  return boardRef.delete()
    .then(() => {
      return response.status(204).json({ });
    })
    .catch((err) => {
			console.error(err);
			return response.status(500).json({ errors: [boardError.deleteFail] });
		});
}

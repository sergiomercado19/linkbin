const { db } = require('../utils/admin');
const { boardError, authError } = require('../utils/errors');

/**
 * Returns all the boards associated to the user authenticated in this request
 * @param   {String} request.user.email Email is passed in during authentication.
 * @return  {Boards} boards - List of boards.
 */
exports.getUserBoards = async (request, response) => {
  const query = db.collection('boards').where('owner', '==', request.user.email);
  const results = await query.get().catch(() => {
    return response.status(500).json({ errors: [boardError.userQueryFail] });
  });

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

/**
 * Creates a new board with a random ID
 * @param   {String} request.user.email Email is passed in during authentication.
 * @param   {String} request.body.title Title does not need to be unique.
 * @return  {Board} newBoard - List of boards, including the one just added.
 */
exports.newBoard = async (request, response) => {
  const newBoardItem = {
    links: [],
    title: request.body.title,
    owner: request.user.email,
    createdAt: Date.now(),
    lastModified: Date.now(),
  };

  try {
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
  } catch (error) {
    return response.status(500).json({ errors: [boardError.createFail] });
  }
}

/**
 * Deletes a board with a given ID
 * @param   {String} request.params.id Board ID is obtained from the URL param.
 * @param   {String} request.user.email Email is passed in during authentication.
 * @return  {Node} Empty JSON, thus the 204 status.
 */
exports.deleteBoard = async (request, response) => {
  const boardRef = db.collection('boards').doc(request.params.id);
  const board = await boardRef.get().catch(() => {
    return response.status(500).json({ errors: [boardError.lookupFail] });
  });

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

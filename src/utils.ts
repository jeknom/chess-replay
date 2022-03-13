export const isValidGameData = (data: object): data is GameData => 'name' in data
  && 'size' in data
  && 'players' in data
  && 'board' in data
  && 'history' in data;

const mapPieceIdToVisual = (id: string) => {
  let pieceId = id;

  const match = id.match(/[a-z]{2}/);
  if (match) {
    const [matchingId] = match;
    pieceId = matchingId;
  }

  switch (pieceId) {
    case 'wk':
      return '♔';
    case 'wq':
      return '♕';
    case 'wr':
      return '♖';
    case 'wb':
      return '♗';
    case 'wn':
      return '♘';
    case 'wp':
      return '♙';
    case 'bk':
      return '♚';
    case 'bq':
      return '♛';
    case 'br':
      return '♜';
    case 'bb':
      return '♝';
    case 'bn':
      return '♞';
    case 'bp':
      return '♟︎';
    default:
      return '?';
  }
};

export const getBoardWithVisuals = (board: Piece[]) => {
  const boardWithVisuals: PieceWithVisual[] = [];
  for (let i = 0; i < board.length; i += 1) {
    const piece = board[i];
    boardWithVisuals.push({
      ...piece,
      visual: mapPieceIdToVisual(piece.id),
      isEaten: false,
    });
  }

  return boardWithVisuals;
};

export const getPieceIndexAtPosition = (board: PieceWithVisual[], position: Pos) => {
  for (let i = 0; i < board.length; i += 1) {
    const piece = board[i];
    if (piece.pos.x === position.x && piece.pos.y === position.y) {
      return i;
    }
  }

  return -1;
};

// Constructs a new instance of the board which reflects the game state of the provided history
export const getBoardForHistory = (board: PieceWithVisual[], history: Move[]) => {
  const boardClone = [...board];
  for (let h = 0; h < history.length; h += 1) {
    const move = history[h];
    for (let p = 0; p < boardClone.length; p += 1) {
      const piece = boardClone[p];
      if (piece.id === move.pieceId) {
        const pieceIndex = getPieceIndexAtPosition(boardClone, move.toPos);
        if (pieceIndex !== -1 && piece.team !== boardClone[pieceIndex].team) {
          boardClone[pieceIndex].isEaten = true;
        }

        boardClone[p].pos = move.toPos;
      }
    }
  }

  return boardClone;
};

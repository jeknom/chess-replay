export const isValidGameData = (data: object): data is GameData => 'name' in data
  && 'size' in data
  && 'players' in data
  && 'board' in data
  && 'history' in data;

export const mapPieceIdToVisual = (id: string, alt: string) => {
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
      return alt;
  }
};

export const getCurrentHistoryForMove = (history: Move[], currentMove: number) => {
  let historyCopy = [];

  historyCopy = [...history].reverse().slice(0, currentMove);

  return historyCopy;
};

export const getBoardWithVisuals = (board: Piece[]) => {
  const boardClone = [...board];
  const boardWithVisuals: PieceWithVisual[] = [];
  for (let i = 0; i < boardClone.length; i += 1) {
    const piece = boardClone[i];
    boardWithVisuals.push({
      ...piece,
      visual: mapPieceIdToVisual(piece.id, piece.type),
    });
  }

  return boardWithVisuals;
};

// Constructs a new instance of the board which reflects the game
// state of the provided history and move
export const getBoardForHistory = (
  board: PieceWithVisual[],
  history: Move[],
  currentMove: number,
) => {
  const boardClone = [...board];
  const reversedHistory = getCurrentHistoryForMove(history, currentMove);
  for (let h = 0; h < reversedHistory.length; h += 1) {
    const move = reversedHistory[h];

    if (move?.remove?.id) {
      const removedIndex = boardClone.findIndex((p) => p.id === move?.remove?.id);

      if (removedIndex !== -1) {
        boardClone.splice(removedIndex);
      }
    }

    for (let p = 0; p < boardClone.length; p += 1) {
      const piece = boardClone[p];

      if (piece.id === move.pieceId) {
        boardClone[p].pos = move.toPos;
      }
    }
  }

  return boardClone;
};

export const getCapturedPiecesForHistory = (
  history: Move[],
  currentMove: number,
) => {
  const historyClone = getCurrentHistoryForMove(history, currentMove);
  const capturedPieces: Piece[] = [];

  for (let i = 0; i < historyClone.length; i += 1) {
    const { remove } = historyClone[i];

    if (remove !== undefined) {
      capturedPieces.push(remove);
    }
  }

  return capturedPieces;
};

export const getBoardAsIfGameStarted = (board: Piece[], history: Move[]) => {
  const boardClone = JSON.parse(JSON.stringify(board)) as Piece[];

  for (let h = 0; h < history.length; h += 1) {
    const move = history[h];
    if (move.remove) {
      boardClone.push(move.remove);
    }

    for (let p = 0; p < boardClone.length; p += 1) {
      if (move.pieceId === boardClone[p].id) {
        boardClone[p].pos = move.fromPos;
      }
    }
  }

  return boardClone;
};

export const getPositionForIndex = (index: number, dimensions: number): Pos => ({
  x: index % dimensions,
  y: index === 0 ? 0 : Math.floor(index / dimensions),
});

export const getLatestMoveFromHistory = (history: Move[], currentMove: number) => {
  const historyClone = getCurrentHistoryForMove(history, currentMove);

  return historyClone.length !== 0 ? historyClone[historyClone.length - 1] : null;
};

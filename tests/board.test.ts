import { getBoardForHistory, getBoardWithVisuals, getBoardAsIfGameStarted } from '@utils';
import italianGameData from '@mock/italian-game-data.json';

test('gets final board state with expected piece positions', () => {
  const { board, history } = (italianGameData as GameData);
  const boardWithVisuals = getBoardWithVisuals(getBoardAsIfGameStarted(board, history));
  const finishedGameBoard = getBoardForHistory(boardWithVisuals, history, history.length);

  for (let p = 0; p < board.length; p += 1) {
    const piece = board[p];
    let lastPosition = piece.pos;
    for (let h = 0; h < history.length; h += 1) {
      const move = history[h];
      if (move.pieceId === piece.id) {
        lastPosition = move.toPos;
      }
    }

    const finishedPosition = finishedGameBoard.find((p) => p.id === piece.id)?.pos;
    if (finishedPosition) {
      expect(lastPosition.x).toBe(finishedPosition.x);
      expect(lastPosition.y).toBe(finishedPosition.y);
    } else {
      fail('Piece was not found in the finished board!');
    }
  }
});

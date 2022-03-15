import { getBoardForHistory, getBoardWithVisuals, getBoardAsIfGameStarted } from '@utils';
import mockGameData from '../mock/mock-game.json';

test('gets final board state with expected piece positions', () => {
  const { board, history } = (mockGameData as GameData);
  const boardAsIfGameStarted = getBoardAsIfGameStarted(board, history);
  const boardWithVisuals = getBoardWithVisuals(boardAsIfGameStarted);
  const finishedGameBoard = getBoardForHistory(boardWithVisuals, history.reverse(), history.length);

  for (let p = 0; p < finishedGameBoard.length; p += 1) {
    const piece = finishedGameBoard[p];
    let lastPosition = piece.pos;
    for (let h = 0; h < history.length; h += 1) {
      const move = history[h];
      if (move.pieceId === piece.id) {
        lastPosition = move.toPos;
      }
    }

    const finishedPosition = board.find((finished) => finished.id === piece.id);
    if (finishedPosition) {
      expect(lastPosition.x).toBe(finishedPosition.pos.x);
      expect(lastPosition.y).toBe(finishedPosition.pos.y);
    } else {
      fail('Piece was not found in the finished board!');
    }
  }
});

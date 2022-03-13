import { getBoardForHistory, getBoardWithVisuals } from '@utils';
import italianGameData from '@mock/italian-game-data.json';
import pawnEatenData from '@mock/pawn-eaten-data.json';
import friendlyPiecesOverlappingData from '@mock/friendly-pieces-overlap.json';

const BLACK_PAWN_ID = 'bp1';
const WHITE_PAWN_ID = 'wp2';

test('gets board with expected piece positions', () => {
  const { board, history } = (italianGameData as GameData);
  const boardWithVisuals = getBoardWithVisuals(board);
  const finishedGameBoard = getBoardForHistory(boardWithVisuals, history);

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

test('checks opponent pieces are being eaten when in the same cell', () => {
  const { board, history } = (pawnEatenData as GameData);
  const boardWithVisuals = getBoardWithVisuals(board);
  const finishedGameBoard = getBoardForHistory(boardWithVisuals, history);
  const blackPawn = finishedGameBoard.find((p) => p.id === BLACK_PAWN_ID);

  finishedGameBoard.forEach((p) => console.log('id', p.id, 'x', p.pos.x, 'y', p.pos.y));

  expect(blackPawn?.isEaten).toBeTruthy();
});

test('checks that friendly overlapping pieces do not eat each other', () => {
  const { board, history } = (friendlyPiecesOverlappingData as GameData);
  const boardWithVisuals = getBoardWithVisuals(board);
  const finishedGameBoard = getBoardForHistory(boardWithVisuals, history);
  const whitePawn = finishedGameBoard.find((p) => p.id === WHITE_PAWN_ID);

  expect(whitePawn?.isEaten).toBeFalsy();
});

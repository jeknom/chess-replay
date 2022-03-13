declare interface Pos {
  x: number;
  y: number;
}

declare interface Move {
  pieceId: string;
  fromPos: Pos;
  toPos: Pos;
  remove?: Piece;
}

declare interface Piece {
  id: string;
  pos: Pos;
  type: string;
  team: string;
}

declare interface Players {
  white: string;
  black: string;
}

declare interface GameData {
  name: string;
  size: number;
  players: Players;
  board: Piece[];
  history: Move[];
}

declare interface PieceWithVisual extends Piece {
  visual: string;
}

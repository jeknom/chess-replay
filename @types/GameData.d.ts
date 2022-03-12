declare interface Pos {
  x: number;
  y: number;
}

declare interface History {
  pieceId: string;
  fromPos: Pos;
  toPos: Pos;
}

declare interface Board {
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
  board: Board[];
  history: History[];
}

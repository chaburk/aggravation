export interface Player {
  name: string;
  color: string;
  marbles: number[];
  winners: number[];
  start: number;
  limit: number;
  returnFromCenter: number;
  active: boolean;
  middle: boolean;
}

export interface Players {
  [key: number]: Player;
}

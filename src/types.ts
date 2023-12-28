export interface Player {
  name: string;
  color: string;
  marbles: number[];
  start: number;
  limit: number;
  active: boolean;
}

export interface Players {
  [key: number]: Player;
}

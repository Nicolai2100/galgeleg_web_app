export class HighscoreModel {
  word: string;
  username: string;
  score: number;

  constructor( name: string, word: string, score: number) {
    this.username = name;
    this.word = word;
    this.score = score;
  }
}

export class HighscoreModel {
  place: number;
  name: string;
  word: string;
  score: number;
  date: Date;

  constructor(place: number, name: string, word: string, score: number, date: Date) {
    this.place = place;
    this.name = name;
    this.word = word;
    this.score = score;
    this.date = date;
  }
}

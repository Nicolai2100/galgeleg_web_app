import {EventEmitter, Injectable} from '@angular/core';
import {GameModel} from './game.model';

@Injectable({
  providedIn: 'root'
})
export class GamedataService {
  game: GameModel;

  constructor() {
  }

  addGame(newGame: GameModel) {
    this.game = newGame;
  }
}

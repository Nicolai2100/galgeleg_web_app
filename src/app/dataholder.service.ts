import {Injectable} from '@angular/core';
import {GameModel} from './game/game.model';

@Injectable({
  providedIn: 'root'
})
export class DataholderService {

  constructor() {
  }

  getResponseJSON: GameModel =
    {
      synligtOrd: 'computer',
      liv: '5',
      spilVundet: false
    };
}

/*var myObjArray : MyObject[] =  [
  {
    "id": 1,
    "text": "Jon Doe"
  },
  {
    "id": 1,
    "text": "Pablo Escobar"
  }
];
*/

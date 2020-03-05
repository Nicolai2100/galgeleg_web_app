import {Injectable} from '@angular/core';
import {GameInterface} from './game.interface';

@Injectable({
  providedIn: 'root'
})
export class DataholderService {

  constructor() {
  }

  getResponseJSON: GameInterface =
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

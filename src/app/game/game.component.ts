import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {DataholderService} from '../dataholder.service';
import {GameInterface} from './game.interface';
import {GameModel} from './game.model';
import {kebabToCamelCase} from 'codelyzer/util/utils';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  wordToGuess = 'bil';
  imagePath = 'assets/images/galge.png';
  wrongGuessString = '';
  guessValue = '';
  getSynligtOrd;
  numOfWrongGuesses = 0;
  guessnum = 1;
  dataValue: GameInterface;
  dataReceived: GameInterface;


  /*  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
      console.log(event);
      // window.alert(guessInput.value);
    }*/
  private gameData: GameModel;

  constructor(private http: HttpClient, private dataService: DataholderService) {
  }

  ngOnInit() {
    this.fetchGameData();
    this.dataValue = this.dataService.getResponseJSON;
    this.postGalge();
  }

  onClick() {
    if (this.guessValue.length < 1) {
      return;
    } else if (this.guessValue.length === 1) {
      this.onGuessLetter(this.guessValue);
    } else if (this.guessValue.length > 1) {
      this.onGuessWord(this.guessValue);
    }
    // Når der gættes forkert
    if (this.wrongGuessString.length < 1) {
      this.wrongGuessString = this.guessValue;
    } else {
      this.wrongGuessString = this.wrongGuessString + ', ' + this.guessValue;
    }
    this.guessValue = '';
    this.guessnum++;
  }

  private postGalge() {
    console.log('posting game');
    this.http
      .post(
        'http://localhost:8080/galgeleg/s185020', {})
      .subscribe(
        response => console.log(response),
        err => console.log(err)
      );
  }

  private fetchGameData() {
    interface StringJSON {
      valueType: string;
      string: string;
      chars: string;
    }

    interface GameDataJSON {
      synligtOrd: StringJSON;
      liv: StringJSON;
      spilVundet: {
        valueType: string;
      };
    }

    this.http.post(
      'http://localhost:8080/galgeleg/s185020/', {}).subscribe(
      response => console.log(response),
      err => console.log(err)
    );


    /*
        this.http.get<GameDataJSON>(
          'api/com.galgeleg.webapp/galgeleg/1')
          .pipe(
            map(responseData => {
              const responseObj: GameDataJSON = {...responseData};
              return responseObj;
            })).subscribe(gameData => {
            console.log(gameData);
            this.getSynligtOrd = gameData.synligtOrd.string;
          }
        );*/
  }


  onGuessLetter(content: string) {
    this.http
      .put(
        'http://localhost:8080/galgeleg/s185020/' + content,
        JSON.stringify(this.guessValue))
      .subscribe(
        response => console.log(response),
        err => console.log(err));
  }

  /* private fetchGameData() {
     fetch(
       'api/com.galgeleg.webapp/galgeleg/1')
       .then(response => response.json())
       .then(json => console.log(json));
   }
 */


  /*  private fetchGameData() {
      this.http.get(
        'api/com.galgeleg.webapp/galgeleg/1')
        .subscribe(resp => {
          // access the body directly, which is typed as `Config`.
          this.gameData = {...resp};
        });
    }*/

  onGuessWord(content: string) {
    this.http
      .put(
        'https://ng-prjct.firebaseio.com/puts.json',
        JSON.stringify(content))
      .subscribe(responseData => {
        console.log(responseData);
      });
  }


  onPostModel() {
    this.http
      .post(
        'https://ng-prjct.firebaseio.com/galgeleg/1',
        this.dataValue)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }


  /* private fetchGameData() {
    this.http.get<{ [key: string]: GameInterface }>(
      'api/com.galgeleg.webapp/galgeleg/1',
      {
        responseType: 'json'
      })
      .pipe(
        map((responseData => {
          const gameDataArray: GameInterface[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              gameDataArray.push({...responseData[key], id: key});
            }
          }
          return gameDataArray;
        }))).subscribe(gameData => {
        const topData = gameData.pop();
        this.onGameDataFetched(topData);
        return topData;
      }
    );
  }
*/

  onGameDataFetched(liv: string) {
    console.log(Number(liv));
    this.newWrongGuess(Number.parseInt(liv, 10));
  }

  onFetchPosts() {
    this.fetchGameData();
  }

// Opdatererbilledet
  newWrongGuess(numOfWrongs: number) {
    switch (numOfWrongs - 1) {
      case 0: {
        this.imagePath = 'assets/images/galge.png';
        break;
      }

      case 1: {
        this.imagePath = 'assets/images/forkert1.png';
        break;
      }

      case 2: {
        this.imagePath = 'assets/images/forkert2.png';
        break;
      }

      case 3: {
        this.imagePath = 'assets/images/forkert3.png';
        break;
      }
      case 4: {
        this.imagePath = 'assets/images/forkert4.png';
        break;
      }
      case 5: {
        this.imagePath = 'assets/images/forkert5.png';
        break;
      }
      case 6: {
        this.imagePath = 'assets/images/forkert6.png';
        break;
      }
      /*  default: {
          window.alert('Gameover,toughguy!');
          break;
        }*/
    }
  }
}

/*  onCreatePost(postData: { title: string; content: string }) {
    this.http
      .post(
        'https://ng-prjct.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log((responseData));
        console.log(responseData);
      });
  }
*/

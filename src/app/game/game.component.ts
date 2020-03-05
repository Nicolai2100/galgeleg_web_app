import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {DataholderService} from '../shared/dataholder.service';
import {GameInterface} from '../shared/game.interface';
import {GameModel} from '../shared/game.model';
import {kebabToCamelCase} from 'codelyzer/util/utils';
import {Game2Interface} from '../shared/game2.interface';
import {Router} from '@angular/router';
import {LoginModel} from '../welcome/login.model';

interface BogstavModel {
  Bogstav: string;
}

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
  synligtOrd;
  numOfWrongGuesses = 0;
  guessnum = 1;
  dataValue: GameInterface;
  dataReceived: GameInterface;
  bogstav: BogstavModel;


  /*  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
      console.log(event);
      // window.alert(guessInput.value);
    }*/
  private gameData: GameModel;

  constructor(private http: HttpClient, private dataService: DataholderService, private router: Router) {
  }

  ngOnInit() {
    this.fetchStartGameData();
    this.dataValue = this.dataService.getResponseJSON;
  }

  onClick() {
    if (this.guessValue.length < 1) {
      return;
    } else if (this.guessValue.length === 1) {
      // const bm = new BogstavModel();
      // bm.Bogstav = this.guessValue;
      this.onGuessLetter(this.guessValue);
    } else if (this.guessValue.length > 1) {
      // this.onGuessWord(this.guessValue);
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

  private fetchStartGameData() {
    this.http.post<Game2Interface>(
      '/local/galgeleg/s185020', {}).subscribe(
      response => this.onPostResponse(response),
      err => console.log(err)
    );
  }

  private onPostResponse(response: Game2Interface) {
    console.log(response);
    if (response.spilletErSlut) {
      this.router.navigate(['/highscore', {}]);
    } else {
      this.newWrongGuess(response.antalForkerteBogstaver);
      this.synligtOrd = response.synligtOrd;
    }

  }

  onGuessLetter(bogstav: string) {
    this.http
      .get(
        '/local/galgeleg/s185020/' + bogstav)
      .subscribe(
        response => this.updateGameData(response),
        err => console.log(err));
  }

  onGameDataFetched(liv: string) {
    console.log(Number(liv));
    this.newWrongGuess(Number.parseInt(liv, 10));
  }

  onFetchPosts() {
    this.fetchStartGameData();
  }
// Opdater al data
  updateGameData(data: any) {
    // this.wrongGuessString = data.brugteBogstaver;
    this.synligtOrd = data.synligtOrd;
    console.log(data);
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

/*onGuessLetter(content: string) {
  this.http
    .put(
      'api/galgeleg/s185020/' + content,
      JSON.stringify(this.guessValue))
    .subscribe(
      response => console.log(response),
      err => console.log(err));
}*/

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

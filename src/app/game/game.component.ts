import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

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

  /*  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
      console.log(event);
      // window.alert(guessInput.value);
    }*/

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchWordToGuess();
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

  onGuessWord(content: string) {
    this.http
      .put(
        'https://ng-prjct.firebaseio.com/puts.json',
        JSON.stringify(content))
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onGuessLetter(content: string) {
    this.http
      .put(
        'https://ng-prjct.firebaseio.com/puts.json',
        JSON.stringify(this.guessValue))
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  private fetchWordToGuess() {
    this.http.get('http://localhost:7132/galgeleg/1', {
      responseType: 'text'
    })
      .pipe(
        map((responseData => {
          return responseData;
        }))).subscribe(word => {
        this.wordToGuess = word;
        this.getSynligtOrd = word;
        console.log(word);
      }
    );
  }

  onFetchPosts() {
    this.fetchWordToGuess();
  }

// Opdatererbilledet
  newWrongGuess() {
    switch (this.numOfWrongGuesses) {
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
      case      5: {
        this.imagePath = 'assets/images/forkert5.png';
        break;
      }
      case 6: {
        this.imagePath = 'assets/images/forkert6.png';
        break;
      }
      default: {
        window.alert('Gameover,toughguy!');
        break;
      }
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

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @ViewChild('guessInput', {static: false}) guessInputRef: ElementRef;
  allGuesses: string [] = [];
  wordToGuess = 'bil;';
  guessString = '';
  guessValue = '';
  numOfWrongGuesses = 0;
  imagePath = 'assets/images/galge.png';

  constructor() {
  }

  ngOnInit() {
  }

  onClick(guessInput: HTMLInputElement) {
//    window.alert(guessInput.value);
    this.allGuesses.push(guessInput.value);
    // Opdatering af forkerte gæt strengen
    if (this.guessString.length < 1) {
      this.guessString = guessInput.value;
    } else {
      this.guessString = this.guessString + ', ' + guessInput.value;
    }

    // Sammenligning af gættet med ordet
    if (guessInput.value.toLocaleLowerCase() === this.wordToGuess) {
      window.alert('Du har vundet!');
    } else if (this.wordToGuess.includes(guessInput.value)) {
    } else {
      this.numOfWrongGuesses++;
      this.newWrongGuess();
    }
    this.guessValue = '';
  }

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
      case 5: {
        this.imagePath = 'assets/images/forkert5.png';
        break;
      }
      case 6: {
        this.imagePath = 'assets/images/forkert6.png';
        break;
      }
      case 6: {
        this.imagePath = 'assets/images/forkert6.png';
        window.alert('Game over, tough guy!');
        break;
      }
      default: {
        break;
      }
    }
  }
}

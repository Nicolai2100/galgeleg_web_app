import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  wordToGuess = 'bil;';
  wrongGuessString = '';
  guessValue = '';
  getSynligtOrd = '***';
  numOfWrongGuesses = 0;
  imagePath = 'assets/images/galge.png';

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    console.log(event);
  }


  /*@Directive({selector: 'button[counting]'})
class CountClicks {
  numberOfClicks = 0;

  @HostListener('click', ['$event.target'])
  onClick(btn) {
    console.log('button', btn, 'number of clicks:', this.numberOfClicks++);
 }
}*/

//    window.alert(guessInput.value);

  constructor() {
  }

  ngOnInit() {
  }

  onClick() {
    if (this.guessValue.length < 1) {
      return;
    }
    if (this.wordToGuess.includes(this.guessValue)) {
      this.opdaterSynligtOrd(this.guessValue);
    } else {
      // Når der gættes forkert
      this.numOfWrongGuesses++;
      this.newWrongGuess();
      if (this.wrongGuessString.length < 1) {
        this.wrongGuessString = this.guessValue;
      } else {
        this.wrongGuessString = this.wrongGuessString + ', ' + this.guessValue;
      }
    }
    this.guessValue = '';
  }

  // Skal slettes/rettes
  private opdaterSynligtOrd(guessValue: string) {
    const wordArray: string [] = [];
    const words = this.wordToGuess.split('');

    /*
        for (const row of this.wordToGuess) {
          if (row.includes(guessValue)) {


            break;
          }
        }*/


    /*
        for (let row of this.rows) {
          if (!row.selected) {
            this.selectAllChecked = false;
            break;
          }
        }*/


    // this.selectAllChecked = this.rows.every(row => row.selected);

    let i = 0;
    words.forEach((element) => {
      if (!this.wordToGuess.charAt(i).includes(element)) {
        return;
      }
      i++;
    });
    this.getSynligtOrd = 'bil';
    window.alert('Du har vundet!');
    return;
    /*if (this.guessValue === this.wordToGuess) {
      window.alert('Du har vundet!');
    }*/
    if (guessValue === 'b') {
      this.getSynligtOrd = guessValue + this.getSynligtOrd.charAt(1) + this.getSynligtOrd.charAt(2);
    } else if (guessValue === 'i') {
      this.getSynligtOrd = this.getSynligtOrd.charAt(0) + guessValue + this.getSynligtOrd.charAt(2);
    } else {
      this.getSynligtOrd = this.getSynligtOrd.charAt(0) + this.getSynligtOrd.charAt(1) + guessValue;
    }
    if (!this.getSynligtOrd.includes('*')) {
      window.alert('Tillykke! \n\n Du har vundet!');
    }
  }

  // Opdaterer billedet
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
      /*
            case 7: {
              window.alert('Game over, tough guy!');
              break;
            }
      */
      default: {
        window.alert('Game over, tough guy!');
        break;
      }
    }
  }
}

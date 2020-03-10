import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GameInterface} from '../shared/game.interface';
import {GameModel} from '../shared/game.model';
import {Router} from '@angular/router';
import {UserdataService} from '../shared/userdata.service';
import {UserModel} from '../shared/user.model';
import {GamedataService} from '../shared/gamedata.service';

interface BogstavModel {
  Bogstav: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  path = 'http://ec2-13-48-132-112.eu-north-1.compute.amazonaws.com:8080/com.galgeleg.webapp/rest/';
  // path = 'http://localhost:8080/rest/';

  user: UserModel;
  imagePath = 'assets/images/galge.png';
  wrongGuessString = '';
  guessValue = '';
  synligtOrd;
  guessnum = 1;

  constructor(private http: HttpClient,
              private router: Router,
              private userDataService: UserdataService,
              private gameDataService: GamedataService) {
  }

  ngOnInit() {
    this.user = this.userDataService.user;

    console.log(this.userDataService.user.fornavn);
    this.postStartGameData();
  }

  onClick() {
    if (this.guessValue.length < 1) {
      return;
    } else if (this.guessValue.length === 1) {
      this.onGuessLetter(this.guessValue);
    } else if (this.guessValue.length > 1) {
    }
    this.guessValue = '';
    this.guessnum++;
  }

  private postStartGameData() {
    console.log('Sending post request to start game');
    this.http.post<GameInterface>(
      this.path + 'galgeleg/' + this.user.brugernavn, {})
      .subscribe(
        response => this.onResponse(response),
        err => console.log(err));
  }

  // Opdaterer al data
  private onResponse(response: GameInterface) {
    console.log(response);
    if (response.erSpilletSlut[0]) {
      this.gameDataService.addGame(new GameModel(response.synligtOrd,
        response.antalForkerteBogstaver[0],
        response.erSpilletVundet[0]));
      if (response.erSpilletVundet) {
        alert('Tillykke ' + this.user.fornavn + ', du vandt!');
      } else {
        alert('Desværre, du tabte. Bedre held næste gang, ' + this.user.fornavn + '.');
      }
      this.router.navigate(['/highscore', {}]);
    } else {
      this.synligtOrd = response.synligtOrd;
      this.newWrongGuess(response.antalForkerteBogstaver[0]);
      this.wrongGuessString = response.brugteBogstaver.toString();
    }
  }

  onGuessLetter(bogstav: string) {
    this.http
      .get<GameInterface>(
        this.path + 'galgeleg/' + this.user.brugernavn + '/' + bogstav)
      .subscribe(
        response => this.onResponse(response),
        err => console.log(err));
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

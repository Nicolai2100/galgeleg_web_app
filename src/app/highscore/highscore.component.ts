import {Component, OnInit} from '@angular/core';
import {GamedataService} from '../shared/gamedata.service';
import {GameModel} from '../shared/game.model';
import {UserdataService} from '../shared/userdata.service';
import {UserModel} from '../shared/user.model';
import {HttpClient} from '@angular/common/http';
import {GameInterface} from '../shared/game.interface';
import {HighscoreModel} from './Highscore.Model';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.css']
})
export class HighscoreComponent implements OnInit {
  path = 'http://ec2-13-48-132-112.eu-north-1.compute.amazonaws.com:8080/com.galgeleg.webapp/rest/';
  // path = 'http://localhost:8080/rest/';
  game: GameModel;
  user: UserModel;
  str: string;
  highScoreList: HighscoreModel[] = [];

  constructor(private httpClient: HttpClient,
              private gameDataService: GamedataService,
              private userDataService: UserdataService) {
    // this.highScoreList.push(new HighscoreModel('Nicolai L', 'Bil', 0));
    // this.highScoreList.push(new HighscoreModel('Sercan', 'Motorvej', 1));
    // this.highScoreList.push(new HighscoreModel('Sersan', 'Bil', 3));
  }

  ngOnInit() {
    /*
    this.game = this.gameDataService.game;
    this.user = this.userDataService.user;
    if (this.game.spilVundet) {
      this.str = 'Tillykke ' + this.user.fornavn + '! Du har vundet!';
    } else {
      this.str = 'Trist ' + this.user.fornavn + '... Du har tabt!';
    }

    this.getHighScores();
     */
    this.getHighScores();
  }

  private getHighScores() {
    console.log('fetching highscores...')
    this.httpClient.get<any>(
      this.path + 'galgeleg/highscore')
      .subscribe(
        response => {
          response.forEach((s) => {
            this.highScoreList.push(JSON.parse(s));
          });
        },
        err => console.log(err));
  }
}

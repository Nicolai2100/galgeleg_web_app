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
  // path = 'http://localhost:8080/rest';
  game: GameModel;
  user: UserModel;
  str: string;
  highScoreList: HighscoreModel[] = [];

  constructor(private httpClient: HttpClient,
              private gameDataService: GamedataService,
              private userDataService: UserdataService) {
    this.highScoreList.push(new HighscoreModel(1, 'Nicolai L', 'Bil', 0, new Date()));
    this.highScoreList.push(new HighscoreModel(2, 'Sercan', 'Motorvej', 1, new Date()));
    this.highScoreList.push(new HighscoreModel(3, 'Sersan', 'Bil', 3, new Date()));
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
  }

  private getHighScores() {
    this.httpClient.get<HighscoreModel[]>(
      this.path + 'galgeleg/highscore')
      .subscribe(
        response => {
          this.highScoreList = response;
        },
        err => console.log(err));
  }
}

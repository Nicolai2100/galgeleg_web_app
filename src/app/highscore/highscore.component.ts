import {Component, OnInit} from '@angular/core';
import {GamedataService} from '../shared/gamedata.service';
import {GameModel} from '../shared/game.model';
import {UserdataService} from '../shared/userdata.service';
import {UserModel} from '../shared/user.model';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.css']
})
export class HighscoreComponent implements OnInit {
  game: GameModel;
  user: UserModel;

  constructor(private gameDataService: GamedataService,
              private userDataService: UserdataService) {
  }

  ngOnInit() {
    this.game = this.gameDataService.game;
    this.user = this.userDataService.user;
    if (this.game.spilVundet) {
      alert('Tillykke' + this.user.fornavn);
    }
  }

}

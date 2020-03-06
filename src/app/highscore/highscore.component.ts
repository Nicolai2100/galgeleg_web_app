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
  str: string;

  constructor(private gameDataService: GamedataService,
              private userDataService: UserdataService) {
  }

  ngOnInit() {
    this.game = this.gameDataService.game;
    this.user = this.userDataService.user;
    if (this.game.spilVundet) {
      this.str = 'Tillykke ' + this.user.fornavn + '! Du har vundet!';
    } else {
      this.str = 'Trist ' + this.user.fornavn + '... Du har tabt!';

    }
  }

}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {GameComponent} from './game/game.component';
import {FormsModule} from '@angular/forms';
import {AutodirDirective} from './shared/autodir.directive';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { HighscoreComponent } from './highscore/highscore.component';
import { HeaderComponent } from './header/header.component';

const appRoutes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'game', component: GameComponent},
  {path: 'highscore', component: HighscoreComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    AutodirDirective,
    WelcomeComponent,
    HighscoreComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

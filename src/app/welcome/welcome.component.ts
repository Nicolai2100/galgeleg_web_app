import {Component, OnInit} from '@angular/core';
import {LoginModel} from './login.model';
import {HttpClient} from '@angular/common/http';
import {log} from 'util';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserModel} from '../user.model';
import {ResponseInterface} from './response.interface';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  loggedIn = false;
  loginName: string;
  loginPassword: string;
  // loginInfo: LoginModel = new LoginModel('s185020', 'njl_nykode');
  loginInfo: LoginModel;
  user: UserModel;
  imagePath: string;
  welcomeMess: string;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.imagePath = 'assets/images/forkert6.png';
  }

  onLogin() {
    console.log(this.loginName + this.loginPassword);
    this.postLogin(new LoginModel(this.loginName, this.loginPassword)).subscribe(
      response => this.onLoginSucces(response),
      err => this.onLoginError()
    );
  }

  private onLoginError() {
    alert('Du skal indtaste brugernavn og adgangskode for at kunne fortsætte!');
  }

  private onLoginSucces(response: ResponseInterface) {
    console.log(response);
    this.user = new UserModel(response.brugernavn, response.email, response.fornavn, response.efternavn, response.ekstraFelter.webside);
    this.loggedIn = true;
    this.welcomeMess = 'Velkommen til Galgeleg' + this.user.fornavn + '. Klik herunder for at starte spillet';
  }

  postLogin(loginModel: { brugernavn: string; adgangskode: string }): Observable<any> {
    console.log('Sending data');
    return this.http
      .post(
        'api/com.galgeleg.webapp/brugerLogin',
        loginModel);
  }

}

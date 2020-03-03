import {Component, OnInit} from '@angular/core';
import {LoginModel} from './login.model';
import {HttpClient} from '@angular/common/http';
import {log} from 'util';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserModel} from '../user.model';
import {ResponseInterface} from './response.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  loggedIn = false;
  loginName: string;
  loginPassword: string;
  loginInfo: LoginModel = new LoginModel('s185020', 'njl_nykode');
  // loginInfo: LoginModel;
  user: UserModel;
  imagePath: string;
  welcomeMess: string;

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.imagePath = 'assets/images/forkert6.png';
    this.http
      .get(
        'http://localhost:8080/galgeleg/test2').subscribe(
      response => console.log(response),
      err => console.log(err)
    );
  }

  /*
    onLogin() {
      console.log(this.loginName + this.loginPassword);
      this.postLogin(new LoginModel(this.loginName, this.loginPassword)).subscribe(
        response => this.onLoginSucces(response),
        err => this.onLoginError()
      );
    }
  */

  onLogin() {
    // todo slet console.log(this.loginName + this.loginPassword);
    this.postLogin(this.loginInfo)
      .subscribe(
        response => this.onLoginSucces(response),
        err => {
          console.log(err);
          this.onLoginError();
        }
      );
  }

  postLogin(loginModel: { brugernavn: string; adgangskode: string }): Observable<any> {
    console.log('Sending data');
    return this.http
      .post(
        'http://localhost:8080/brugerLogin',
        loginModel);
  }

  private onLoginError() {
    alert('Du skal indtaste brugernavn og adgangskode for at kunne fortsætte!');
  }

  private onLoginSucces(response: ResponseInterface) {
    console.log(response);
    this.user = new UserModel(response.brugernavn, response.email, response.fornavn, response.efternavn, response.ekstraFelter.webside);
    this.loggedIn = true;
    this.router.navigate(['/game', { }]);
  }


  /* private postGalge() {
     console.log('posting game');
     return this.http
       .post(
         'api/com.galgeleg.webapp/galgeleg/s185020',
         {brugernavn: this.loginInfo.brugernavn})
       .subscribe(
         response => console.log(response),
         err => console.log(err)
       );

 //         'http://localhost:8080/galgeleg/xxx/s185020', {})

   }*/

}


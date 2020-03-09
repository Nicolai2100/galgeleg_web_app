import {Component, OnInit} from '@angular/core';
import {LoginModel} from '../shared/login.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../shared/user.model';
import {ResponseInterface} from './response.interface';
import {Router} from '@angular/router';
import {log} from 'util';
import {UserdataService} from '../shared/userdata.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  path = 'http://ec2-13-48-132-112.eu-north-1.compute.amazonaws.com:8080/com.galgeleg.webapp/rest/';
  // path = 'http://localhost:8080/rest';
  loggedIn = false;
  loginName: string;
  loginPassword: string;
  user: UserModel;
  imagePath: string;
  welcomeMess: string;

  constructor(private http: HttpClient, private router: Router, private userDataService: UserdataService) {
  }

  ngOnInit() {
    this.imagePath = 'assets/images/forkert6.png';
  }

  onLogin() {
    console.log(this.loginName + this.loginPassword);
    this.postLogin()
      .subscribe(
        response => this.onLoginSucces(response),
        err => {
          console.log(err);
          this.onLoginError();
        }
      );
  }

  postLogin(loginModel = new LoginModel(this.loginName, this.loginPassword)): Observable<any> {
    console.log('Sending login data');
    return this.http
      .post(
        this.path + 'brugerLogin',
        loginModel);
  }

  private onLoginError() {
    alert('Du skal indtaste brugernavn og adgangskode for at kunne fortsætte!');
  }

  private onLoginSucces(response: ResponseInterface) {
    this.user = new UserModel(response.brugernavn, response.email, response.fornavn, response.efternavn, response.ekstraFelter.webside);
    this.loggedIn = true;
    this.userDataService.addUser(this.user);
    this.router.navigate(['/game', {}]);
  }
}

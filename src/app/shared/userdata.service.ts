import {EventEmitter, Injectable} from '@angular/core';
import {UserModel} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  user: UserModel;

  constructor() {
  }

  addUser(newUser: UserModel) {
    this.user = newUser;
  }
}

import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  highScoreList: string[];

  constructor(private http: HttpClient) {
  }


}

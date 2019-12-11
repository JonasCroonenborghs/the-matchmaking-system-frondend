import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {UserLogin} from '../models/user-login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  isLoggedin = new BehaviorSubject(localStorage.getItem('token') ? true : false);
  public huidigeGebruiker: Observable<User>;
  constructor(private httpClient: HttpClient) { }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem("token");
    this.isLoggedin = new BehaviorSubject(localStorage.getItem('token') ? true : false);
  }

  authenticate(userLogin: UserLogin): Observable<User> {
    return this.httpClient.post<User>("https://localhost:5001/api/User/login", userLogin);
  }

  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}

// @ts-ignore
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Assignment} from '../models/assignment.model';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GebruikerService {

  constructor(private http: HttpClient) {
  }

  createUser(user : User){
    return this.http.post('https://localhost:5001/api/User/register', user)
  }

  getUserRoles(){
    return this.http.get('https://localhost:5001/api/Role');
  }

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>('https://localhost:5001/api/Assignment');
  // }
  //
  // getUser(userID: number) {
  //   return this.http.get<User>('https://localhost:5001/api/Assignment/' + assignmentID);
  // }
}

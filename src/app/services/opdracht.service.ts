import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Assignment} from '../models/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class OpdrachtService {

  constructor(private http: HttpClient) {
  }

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>('https://localhost:5001/api/Assignment');
  }

  getAssignment(assignmentID: number) {
    return this.http.get<Assignment>('https://localhost:5001/api/Assignment/' + assignmentID);
  }
}

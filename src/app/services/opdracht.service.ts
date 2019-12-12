import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Assignment} from '../models/assignment.model';
import {Maker} from '../models/maker.model';

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

  addAssignment(assignment: Assignment) {
    return this.http.post('https://localhost:5001/api/Assignment/', assignment);
  }

  updateAssignment(assignmentID: number, assignment: Assignment) {
    return this.http.put<Assignment>('https://localhost:5001/api/Assignment/' + assignmentID, assignment);
  }
}

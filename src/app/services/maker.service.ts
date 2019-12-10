import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Assignment} from '../models/assignment.model';
import {Maker} from '../models/maker.model';

@Injectable({
  providedIn: 'root'
})
export class MakerService {

  constructor(private http: HttpClient) {
  }

  getMakers(): Observable<Maker[]> {
    return this.http.get<Maker[]>('https://localhost:5001/api/Maker');
  }

  getMaker(makerID: number) {
    return this.http.get<Maker>('https://localhost:5001/api/Maker/' + makerID);
  }
}

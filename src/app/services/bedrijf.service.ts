import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Assignment} from '../models/assignment.model';
import {Company} from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class BedrijfService {

  constructor(private http: HttpClient) {
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>('https://localhost:5001/api/Company');
  }

  getCompany(companyID: number) {
    return this.http.get<Company>('https://localhost:5001/api/Company/' + companyID);
  }
}

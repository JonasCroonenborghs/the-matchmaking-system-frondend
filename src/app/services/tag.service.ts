import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Assignment} from '../models/assignment.model';
import {Tag} from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) {
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>('https://localhost:5001/api/Tag');
  }

  getTag(tagID: number) {
    return this.http.get<Tag>('https://localhost:5001/api/Tag/' + tagID);
  }

  addTag(tag: Tag) {
    return this.http.post('https://localhost:5001/api/Tag/', tag);
  }
}

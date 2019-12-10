import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Assignment} from '../models/assignment.model';
import {Review} from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) {
  }

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>('https://localhost:5001/api/Review');
  }

  getReview(reviewID: number) {
    return this.http.get<Review>('https://localhost:5001/api/Review/' + reviewID);
  }

  getReviewsByMakerID(makerID: number) {
    return this.http.get<Review[]>('https://localhost:5001/api/Reviews/byMakerID/' + makerID);
  }

  getReviewsByCompanyID(companyID: number) {
    return this.http.get<Review[]>('https://localhost:5001/api/Reviews/ByCompanyID/' + companyID);
  }
}

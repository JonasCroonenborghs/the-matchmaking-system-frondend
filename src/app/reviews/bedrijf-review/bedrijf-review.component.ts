import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Review} from '../../models/review.model';
import {ReviewService} from '../../services/review.service';

@Component({
  selector: 'app-bedrijf-review',
  templateUrl: './bedrijf-review.component.html',
  styleUrls: ['./bedrijf-review.component.scss']
})
export class BedrijfReviewComponent implements OnInit {

  public reviews: Observable<Review[]>;
  public companyID: number;

  constructor(private _reviewService: ReviewService) {
    this.companyID = 1;
    this.reviews = this._reviewService.getReviewsByCompanyID(this.companyID);
  }

  ngOnInit() {
  }

}

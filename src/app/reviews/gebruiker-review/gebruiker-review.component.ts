import {Component, OnInit} from '@angular/core';
import {ReviewService} from '../../services/review.service';
import {Observable} from 'rxjs';
import {Review} from '../../models/review.model';

@Component({
  selector: 'app-gebruiker-review',
  templateUrl: './gebruiker-review.component.html',
  styleUrls: ['./gebruiker-review.component.scss']
})
export class GebruikerReviewComponent implements OnInit {

  public reviews: Observable<Review[]>;
  public makerID: number;

  constructor(private _reviewService: ReviewService) {
    this.makerID = 1;
    this.reviews = this._reviewService.getReviewsByMakerID(this.makerID);
  }

  ngOnInit() {
  }

}

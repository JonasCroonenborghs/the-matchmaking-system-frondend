import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Review} from '../../../models/review.model';
import {ReviewService} from '../../../services/review.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-reviews-beheren',
  templateUrl: './reviews-beheren.component.html',
  styleUrls: ['./reviews-beheren.component.scss']
})
export class ReviewsBeherenComponent implements OnInit {

  submitted: boolean = false;
  errorBool: boolean = false;
  errorMessage: string = '';

  reviewForm: FormGroup;
  review: Review;
  reviewID: number;

  reviews: Observable<Review[]>;

  constructor(private _reviewService: ReviewService) {
    this.reviewForm = new FormGroup({
      reviewerID: new FormControl(''),
      receiverID: new FormControl(''),
      assignmentID: new FormControl(''),
      description: new FormControl(''),
      like: new FormControl('')
    });

    this.reviewID = 1;
    this._reviewService.getReview(this.reviewID).subscribe(result => {
      this.review = result;
    });

    this.reviews = _reviewService.getReviews();
  }

  onClickBewerkReview(review: Review) {
    this.review = review;
  }

  onCLickVerwijderReview(gekozenReviewID: number) {
    this._reviewService.deleteReview(gekozenReviewID).subscribe();
  }

  onSubmit() {
    this._reviewService.updateReview(this.reviewID, this.reviewForm.value).subscribe(result => {
      this.submitted = true;
    }, error => {
      this.submitted = false;
      this.errorBool = true;
      this.errorMessage = 'Er is iets misgegaan bij het wijzigen.';
    });
  }

  ngOnInit() {
  }

}

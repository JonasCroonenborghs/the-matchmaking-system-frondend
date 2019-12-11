import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Review} from '../../../models/review.model';
import {ReviewService} from '../../../services/review.service';

@Component({
  selector: 'app-reviews-beheren',
  templateUrl: './reviews-beheren.component.html',
  styleUrls: ['./reviews-beheren.component.scss']
})
export class ReviewsBeherenComponent implements OnInit {

  submitted: boolean = false;

  reviewForm: FormGroup;
  review: Review;
  reviewID: number;

  constructor(private _reviewService: ReviewService) {
    this.reviewForm = new FormGroup({
      reviewerID: new FormControl('', {validators: [Validators.required]}),
      receiverID: new FormControl('', {validators: [Validators.required]}),
      assignmentID: new FormControl('', {validators: [Validators.required]}),
      description: new FormControl('', {validators: [Validators.required]}),
      like: new FormControl('', {validators: [Validators.required]})
    });

    this.reviewID = 1;
    this._reviewService.getReview(this.reviewID).subscribe(result => {
      this.review = result;
    });
  }

  onSubmit() {
    this.submitted = true;
    this._reviewService.updateReview(this.reviewID, this.reviewForm.value).subscribe();
  }

  ngOnInit() {
  }

}

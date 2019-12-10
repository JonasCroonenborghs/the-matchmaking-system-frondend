import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  reviewForm: FormGroup;
  errorBool: boolean = false;
  submitted: boolean = false;
  errorMessage: string = '';

  constructor() {
    this.reviewForm = new FormGroup({
      reviewerID: new FormControl('', {validators: [Validators.required]}),
      receiverID: new FormControl('', {validators: [Validators.required]}),
      assignmentID: new FormControl(''),
      description: new FormControl('', {validators: [Validators.required]}),
      like: new FormControl('')
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
  }

}

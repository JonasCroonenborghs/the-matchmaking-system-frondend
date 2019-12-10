import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  tagForm: FormGroup;
  errorBool: boolean = false;
  submitted: boolean = false;
  errorMessage: string = '';

  constructor() {
    this.tagForm = new FormGroup({
      name: new FormControl('', {validators: [Validators.required]})
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
  }

}

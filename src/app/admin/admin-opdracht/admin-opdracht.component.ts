import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-opdracht',
  templateUrl: './admin-opdracht.component.html',
  styleUrls: ['./admin-opdracht.component.scss']
})
export class AdminOpdrachtComponent implements OnInit {

  opdrachtForm: FormGroup;
  errorBool: boolean = false;
  submitted: boolean = false;
  errorMessage: string = '';

  constructor() {
    this.opdrachtForm = new FormGroup({
      companyID: new FormControl('', {validators: [Validators.required]}),
      title: new FormControl('', {validators: [Validators.required]}),
      description: new FormControl('', {validators: [Validators.required]}),
      deadline: new FormControl('', {validators: [Validators.required]}),
      location: new FormControl('', {validators: [Validators.required]}),
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
  }

}

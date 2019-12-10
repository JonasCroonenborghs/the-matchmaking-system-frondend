import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profiel',
  templateUrl: './profiel.component.html',
  styleUrls: ['./profiel.component.scss']
})
export class ProfielComponent implements OnInit {
  registrationForm: FormGroup;
  errorBool: boolean = false;
  errorMessage: string = '';
  submitted: boolean = false;

  constructor() {
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', {validators: [Validators.required]}),
      lastName: new FormControl('', {validators: [Validators.required]}),
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(5)]}),
      controlPassword: new FormControl('', {validators: [Validators.required]})
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
  }

}

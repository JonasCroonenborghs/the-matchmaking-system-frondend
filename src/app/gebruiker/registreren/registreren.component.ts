import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-registreren',
  templateUrl: './registreren.component.html',
  styleUrls: ['./registreren.component.scss']
})
export class RegistrerenComponent implements OnInit {
  registrationForm: FormGroup;
  errorBool : boolean = false;
  submitted : boolean = false;
  errorMessage : string = "";

  constructor() {
    this.registrationForm = new FormGroup({
    firstName: new FormControl('', {validators: [Validators.required]}),
    lastName: new FormControl('', {validators: [Validators.required]}),
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
    password: new FormControl('', { validators: [Validators.required, Validators.minLength(5)]}),
    controlPassword: new FormControl('', { validators: [Validators.required]})
  });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
  }
}

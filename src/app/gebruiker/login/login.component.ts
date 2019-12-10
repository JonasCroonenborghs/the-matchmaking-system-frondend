import { Component, OnInit } from '@angular/core';
import {UserLogin} from "../../models/user-login.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model : UserLogin = new UserLogin("","");
  submitted : Boolean = false;
  constructor() { }

  ngOnInit() {

  }

  onSubmit() {
    this.submitted = true;
  }
}

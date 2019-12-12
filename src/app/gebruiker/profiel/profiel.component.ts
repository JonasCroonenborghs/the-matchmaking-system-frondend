import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user.model';
import {GebruikerService} from '../../services/gebruiker.service';
import {Observable} from 'rxjs';

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
  myUser : User;
  roles :any;

  constructor(private _gebruikerService : GebruikerService) {
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', {validators: [Validators.required]}),
      lastName: new FormControl('', {validators: [Validators.required]}),
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]})
    });
  }

  ngOnInit() {
    this._gebruikerService.getCurrentUser().subscribe(
      user => this.registrationForm.patchValue(user)
    );
    this._gebruikerService.getCurrentUser().subscribe(
      user => this.myUser = user
    );
    this._gebruikerService.getUserRoles().subscribe(res => {
      this.roles = res;
    });
  }

  onSubmit() {
    this.submitted = true;

    this._gebruikerService.updateGebruiker(this.myUser.userID, this.myUser);
  }

}

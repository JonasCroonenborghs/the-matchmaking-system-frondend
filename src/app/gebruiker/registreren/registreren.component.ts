// @ts-ignore
import {Component, OnInit} from '@angular/core';
// @ts-ignore
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user.model';
import {GebruikerService} from '../../services/gebruiker.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registreren',
  templateUrl: './registreren.component.html',
  styleUrls: ['./registreren.component.scss']
})
export class RegistrerenComponent implements OnInit {
  registrationForm: FormGroup;
  errorBool: boolean = false;
  submitted: boolean = false;
  errorMessage: string = '';
  roles: any;
  currentDate = new Date();
  user: User;

  constructor(private _router: Router, private _gebruikerService: GebruikerService) {
    this.registrationForm = new FormGroup({
      Role: new FormControl(),
      FirstName: new FormControl('', {validators: [Validators.required]}),
      LastName: new FormControl('', {validators: [Validators.required]}),
      Email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      Password: new FormControl('', {validators: [Validators.required, Validators.minLength(5)]}),
      ControlPassword: new FormControl('', {validators: [Validators.required]})
    });
  }

  ngOnInit() {
    //eventueel binnenhalen
    this._gebruikerService.getUserRoles().subscribe(res => {
      this.roles = res;
    });
  }

  onSubmit() {
    this.submitted = true;
    const form = this.registrationForm.value;
    console.log('FORM: ' + JSON.stringify(form));

    //const user = new User(0,form.firstName, form.lastName,form.email, Date.now().toLocaleString(), form.password, this.selectedRole);
    this.user = new User(0, form.Email, form.Password, form.FirstName, form.LastName, form.Role);
    this._gebruikerService.createUser(this.user).subscribe(result => {
        this._router.navigate(['/login']);
      },
      error => {
        this.errorBool = true;
        this.submitted = false;
        console.log('ERROR: ' + JSON.stringify(error));
        this.errorMessage = 'Registration failed, please try again.';
      }
    );

    console.log('USER: ' + JSON.stringify(this.user));
  }

}

import {Component, OnInit} from '@angular/core';
import {UserLogin} from '../../models/user-login.model';
import {AuthenticateService} from '../../services/authenticate.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: UserLogin = new UserLogin('', '');
  submitted: Boolean = false;
  hide = true;

  constructor(private router: Router, private authenticateService: AuthenticateService) {
  }

  ngOnInit() {

  }

  onSubmit() {
    this.submitted = true;
    console.log(this.model);
    this.authenticateService.authenticate(this.model).subscribe(result => {
      console.log(result);
      // this.authenticateService.isLoggedin.next(result.token ? true : false);
      // localStorage.setItem('token', result.token);
      this.router.navigate(['/dashboard']);
    });
  }
}

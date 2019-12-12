import { Component } from '@angular/core';
import { AuthenticateService } from './services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Match A Maker';
  aangemeld: boolean;
  isAdmin: boolean;
  isMaker: boolean;
  isCompany: boolean;

  constructor(private authenticateService: AuthenticateService, private _router: Router) {
    this.authenticateService.isLoggedin.subscribe(result => {
      this.aangemeld = result;
      console.log("AANGEMELD: " + result);
      if (!this.aangemeld) {
        _router.navigate(['/'])
      }
    })
    // nakijken welke rol de ingelogde gebruiker heeft, zodat aan de hand daarvan enkel de routes getoond worden in de navbar waar de gebruiker toegang tot heeft
    this.authenticateService.currentUserRoleSubject.subscribe(result => {
      switch (result) {
        case "Admin":
          this.isAdmin = true;
        case "Maker":
          this.isMaker = true;
        case "Company":
          this.isCompany = true;
      }
    })
  }

  logOut() {
    this.authenticateService.logout()
    this.authenticateService.isLoggedin.subscribe(result => {
      this.aangemeld = result;
      console.log("AANGEMELD: " + result);
    })
    this.isAdmin = false;
    this.isCompany = false;
    this.isMaker = false;
  }
}

import { Component } from '@angular/core';
import { AuthenticateService } from './services/authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Match A Maker';
  aangemeld : boolean;

  constructor(private authenticateService : AuthenticateService){
    this.authenticateService.isLoggedin.subscribe(result=>{
      this.aangemeld=result
    })
  }

  logOut(){
    this.authenticateService.logout()
    this.authenticateService.isLoggedin.subscribe(result=>{
      this.aangemeld=result
    })
  }
}

import { Component } from '@angular/core';
import { AuthenticateService } from './services/authenticate.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Match A Maker';
  aangemeld : boolean;

  constructor(private authenticateService : AuthenticateService, private _router : Router){
    this.authenticateService.isLoggedin.subscribe(result=>{
      this.aangemeld=result;
      console.log("AANGEMELD: "+result);
      if(!this.aangemeld){
        _router.navigate(['/'])
      }
    })
  }

  logOut(){
    this.authenticateService.logout()
    this.authenticateService.isLoggedin.subscribe(result=>{
      this.aangemeld=result;
      console.log("AANGEMELD: "+result);
    })
  }
}

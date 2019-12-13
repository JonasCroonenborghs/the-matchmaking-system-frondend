import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GebruikerService } from 'src/app/services/gebruiker.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-account-activatie',
  templateUrl: './account-activatie.component.html',
  styleUrls: ['./account-activatie.component.scss']
})
export class AccountActivatieComponent implements OnInit {

  tekstActivatieSuccesvol: string = "Uw account werd succesvol geactiveerd. U kan nu inloggen.";
  teTonenTekst: string = "Gelieve via de link in uw mail uw registratie te bevestigen";
  constructor(private activatedRoute: ActivatedRoute, private _gebruikerService: GebruikerService, private authenticateService: AuthenticateService) {
    //authenticateService.isCurrentRouteAccountActivatie = new BehaviorSubject(true);
    activatedRoute.paramMap.subscribe(result => {
      console.log(result);
      var code = result.get('activatiecode');
      console.log(code);
      this.controleerActivatiecode(code);
    })
  }

  ngOnInit() {
  }

  controleerActivatiecode(code: any) {
    this._gebruikerService.controleerActivatieGebruiker(code).subscribe(result => {
      console.log(result);
      if (result = true) {
        this.teTonenTekst = this.tekstActivatieSuccesvol;
      }
    });
  }
}

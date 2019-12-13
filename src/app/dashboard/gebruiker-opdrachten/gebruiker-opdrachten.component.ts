import { Component, OnInit } from '@angular/core';
import { OpdrachtService } from 'src/app/services/opdracht.service';
import { GebruikerService } from 'src/app/services/gebruiker.service';

@Component({
  selector: 'app-gebruiker-opdrachten',
  templateUrl: './gebruiker-opdrachten.component.html',
  styleUrls: ['./gebruiker-opdrachten.component.scss']
})
export class GebruikerOpdrachtenComponent implements OnInit {
  searchText : string = "";
  opdrachten : any;
  currentUser : any;
  currentUID : number;

  constructor(private _opdrachtService: OpdrachtService, private _gebruikerService : GebruikerService) {
      
   }

  ngOnInit() {
    this.currentUID = this.getCurrentGebruiker().UserID;
    console.log(this.currentUID);
    this._opdrachtService.getAssignmentRequests(this.currentUID).subscribe(res=> this.opdrachten = res);
    console.log(JSON.stringify(this.opdrachten));
  }

//ingelogde gebruiker ID opvragen
getCurrentGebruiker() {
  if (localStorage.getItem('token') != null) {
    let jwtData = localStorage.getItem("token").split('.')[1];
    let decodedJwt = window.atob(jwtData);
    console.log(JSON.parse(decodedJwt));
    return JSON.parse(decodedJwt);
  }
  return null;
}
}

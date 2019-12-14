import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OpdrachtService } from 'src/app/services/opdracht.service';
import { GebruikerService } from 'src/app/services/gebruiker.service';
import { Assignment } from '../../models/assignment.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { formatDate } from '@angular/common';

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
  selectedCompanyID: number = null;
  selectedAssignment : Assignment = null;
  currentDate : Date;

  constructor(private _opdrachtService: OpdrachtService, private _gebruikerService : GebruikerService) {
      
   }  

  ngOnInit() {
    this.currentDate = new Date();
    console.log(this.currentDate);
    this.currentUID = this.getCurrentGebruiker().UserID;
    console.log(this.currentUID);
    this._opdrachtService.getAssignmentRequests(this.currentUID).subscribe(res=> this.opdrachten = res);
    console.log(JSON.stringify(this.opdrachten));
  }

  showBedrijfInfo(assignment: Assignment) {
    this.selectedCompanyID = assignment.companyID;
    console.log(this.selectedCompanyID);
  }

  showDeleteAlert(assignment : Assignment){
    this.selectedAssignment = assignment;
  }

  removeAssignmentRequest(assignmentID : number){
    this._opdrachtService.deleteAssignmentRequest(this.currentUID,assignmentID).subscribe();
    this.selectedAssignment = null;
    window.location.reload();
  }

  close(){
    this.selectedCompanyID = null;
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

import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Assignment} from '../../models/assignment.model';
import {OpdrachtService} from '../../services/opdracht.service';
import {GebruikerService} from '../../services/gebruiker.service';
import {TagService} from '../../services/tag.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public opdrachten: Assignment[];
  searchText: string = '';
  filterOpdrachten : any;
  selectedCompanyID : number;
  selectedCompany : boolean = false;
  makerID : number;
  tags : any;

  constructor(private _opdrachtService: OpdrachtService, private _gebruikerService : GebruikerService, private _tagService : TagService) {
  }

  ngOnInit() {
    this._opdrachtService.getAssignments().subscribe(res=> this.opdrachten = res);
    this.selectedCompany = false;
    this._gebruikerService.getCurrentUser().subscribe(res=> this.makerID = res.userID);
    this._tagService.getTags().subscribe(res=>this.tags = res);
  }

  showBedrijfInfo(opdracht : Assignment) {
    this.selectedCompany = true;
    this.selectedCompanyID = opdracht.companyID;
    console.log(opdracht.companyID);
  }

  assignmentAanvragen(opdracht : Assignment) {
    this._opdrachtService.addAssignmentRequest(opdracht.assignmentID,this.makerID).subscribe();
    console.log("ASSIGNMENT ID: "+opdracht.assignmentID + "  MAKER ID: " + this.makerID);
    window.location.reload();
  }

  logTags(tags : any){
    console.log("TAGS: " + JSON.stringify(tags))
  }
}

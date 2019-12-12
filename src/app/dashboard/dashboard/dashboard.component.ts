import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Assignment} from '../../models/assignment.model';
import {OpdrachtService} from '../../services/opdracht.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public opdrachten: Observable<Assignment[]>;
  searchText: string = '';
  filterOpdrachten : any;

  constructor(private _opdrachtService: OpdrachtService) {
  }

  assignCopy(){
    //filterlijst maken
    this.filterOpdrachten = Object.assign([], this.opdrachten);
  }
  //filteren lijst
  filterItem(value){
    if(!value){
      this.assignCopy();
    } // when nothing has typed
    this.filterOpdrachten = Object.assign([], this.opdrachten).filter(
      item => item.Gebruikersnaam.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }

  ngOnInit() {
    this.opdrachten = this._opdrachtService.getAssignments();
  }

  showBedrijfInfo() {

  }

  assignmentAanvragen() {

  }
}

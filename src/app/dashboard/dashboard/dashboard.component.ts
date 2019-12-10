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

  constructor(private _opdrachtService: OpdrachtService) {
    this.opdrachten = this._opdrachtService.getAssignments();
  }

  ngOnInit() {
  }

}

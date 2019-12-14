import { Component, OnInit } from '@angular/core';
import { OpdrachtService } from 'src/app/services/opdracht.service';
import { Assignment } from 'src/app/models/assignment.model';

@Component({
  selector: 'app-inzendingen',
  templateUrl: './inzendingen.component.html',
  styleUrls: ['./inzendingen.component.scss']
})
export class InzendingenComponent implements OnInit {
  opdrachten: Assignment[];

  constructor(private opdrachtService: OpdrachtService) {
    this.getAllUnassignedAssignments();
  }

  ngOnInit() {
  }

  getAllUnassignedAssignments() {
    this.opdrachtService.getUnassignedAssignmentsByCompanyID(1).subscribe(result => {
      console.log(result);
      this.opdrachten = result;
    });
  }

}

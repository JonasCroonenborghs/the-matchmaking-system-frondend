import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OpdrachtService} from '../../../services/opdracht.service';
import {Observable} from 'rxjs';
import {Maker} from '../../../models/maker.model';
import {Assignment} from '../../../models/assignment.model';

@Component({
  selector: 'app-opdrachten-beheren',
  templateUrl: './opdrachten-beheren.component.html',
  styleUrls: ['./opdrachten-beheren.component.scss']
})
export class OpdrachtenBeherenComponent implements OnInit {

  opdrachtForm: FormGroup;
  errorBool: boolean = false;
  submitted: boolean = false;
  errorMessage: string = '';

  opdrachten: Observable<Assignment[]>;
  opdracht: Assignment;

  constructor(private _opdrachtService: OpdrachtService) {
    this.opdrachtForm = new FormGroup({
      title: new FormControl('', {validators: [Validators.required]}),
      companyID: new FormControl('', {validators: [Validators.required]}),
      description: new FormControl('', {validators: [Validators.required]}),
      deadline: new FormControl('', {validators: [Validators.required]}),
      location: new FormControl('', {validators: [Validators.required]}),
      status: new FormControl('', {validators: [Validators.required]})
    });

    this.opdrachten = _opdrachtService.getAssignments();
  }

  onCLickToevoegenOpdracht() {
    this.opdracht = null;
  }

  onClickBewerkOpdracht(gekozenOpdracht: Assignment) {
    this.opdracht = gekozenOpdracht;
  }

  onSubmit() {
    this.submitted = true;

    if (this.opdracht == null) {
      this._opdrachtService.addAssignment(this.opdrachtForm.value).subscribe();
    } else {
      this._opdrachtService.updateAssignment(this.opdracht.assignmentID, this.opdrachtForm.value).subscribe();
    }
  }

  ngOnInit() {
  }

}

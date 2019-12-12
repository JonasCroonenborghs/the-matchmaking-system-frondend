import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OpdrachtService} from '../../../services/opdracht.service';
import {Observable} from 'rxjs';
import {Maker} from '../../../models/maker.model';
import {Assignment} from '../../../models/assignment.model';
import {BedrijfService} from '../../../services/bedrijf.service';
import {Company} from '../../../models/company.model';
import {MakerService} from '../../../services/maker.service';

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

  bedrijven: Observable<Company[]>;
  makers: Observable<Maker[]>;

  constructor(private _opdrachtService: OpdrachtService,
              private _bedrijfService: BedrijfService,
              private _makerService: MakerService) {
    this.opdrachtForm = new FormGroup({
      companyID: new FormControl('', {validators: [Validators.required]}),
      makerID: new FormControl(''),
      title: new FormControl('', {validators: [Validators.required]}),
      description: new FormControl('', {validators: [Validators.required]}),
      closeDate: new FormControl('')
    });

    this.opdrachten = _opdrachtService.getAssignments();
    this.bedrijven = _bedrijfService.getCompanies();
    this.makers = _makerService.getMakers();
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

  onCLickVerwijderOpdracht(gekozenOpdrachtID: number) {
    this._opdrachtService.deleteAssignment(gekozenOpdrachtID).subscribe();
  }

  ngOnInit() {
  }

}

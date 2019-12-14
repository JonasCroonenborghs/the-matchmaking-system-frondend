import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OpdrachtService} from '../../../services/opdracht.service';
import {Observable} from 'rxjs';
import {Maker} from '../../../models/maker.model';
import {Assignment} from '../../../models/assignment.model';
import {BedrijfService} from '../../../services/bedrijf.service';
import {Company} from '../../../models/company.model';
import {MakerService} from '../../../services/maker.service';
import {User} from '../../../models/user.model';

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
  errorMessageDelete: string = '';

  opdrachten: Observable<Assignment[]>;
  opdracht: Assignment;

  bedrijven: Observable<Company[]>;
  makers: Observable<Maker[]>;

  constructor(private _opdrachtService: OpdrachtService,
              private _bedrijfService: BedrijfService,
              private _makerService: MakerService) {
    this.opdrachtForm = new FormGroup({
      assignmentID: new FormControl(''),
      companyID: new FormControl(''),
      title: new FormControl(''),
      closeDate: new FormControl(''),
      makerID: new FormControl(''),
      description: new FormControl('')
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
    const form = this.opdrachtForm.value;

    if (this.opdracht == null) {
      // this.opdracht = new Assignment(0, form.companyID, form.makerID, form.title, form.description, form.closeDate);
      this._opdrachtService.addAssignment(this.opdrachtForm.value).subscribe(result => {
        this.submitted = true;
      }, error => {
        this.submitted = false;
        this.errorBool = true;
        this.errorMessage = 'Er is iets misgegaan bij het toevoegen.';
      });
    } else {
      this._opdrachtService.updateAssignment(this.opdracht.assignmentID, this.opdrachtForm.value).subscribe(result => {
        this.submitted = true;
      }, error => {
        this.submitted = false;
        this.errorBool = true;
        this.errorMessage = 'Er is iets misgegaan bij het wijzigen.';
      });
    }
  }

  onCLickVerwijderOpdracht(gekozenOpdrachtID: number) {
    this._opdrachtService.deleteAssignment(gekozenOpdrachtID).subscribe();
    // this._opdrachtService.deleteAssignment(gekozenOpdrachtID).subscribe(result => {
    // }, error => {
    //   this.errorBool = true;
    //   this.errorMessageDelete = 'Deze opdracht kan niet verwijderd worden omdat er een maker is toegevoegd';
    // });
  }

  ngOnInit() {
  }

}

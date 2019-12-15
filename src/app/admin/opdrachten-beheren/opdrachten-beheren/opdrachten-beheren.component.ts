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
      companyID: new FormControl(''),
      title: new FormControl(''),
      closeDate: new FormControl(''),
      description: new FormControl('')
    });

    this.opdrachten = _opdrachtService.getAssignments();
    this.bedrijven = _bedrijfService.getCompanies();
    this.makers = _makerService.getMakers();
  }

  onCLickToevoegenOpdracht() {
    this.clearOpdrachtForm();
    this.opdracht = null;
  }

  onClickBewerkOpdracht(gekozenOpdracht: Assignment) {
    this.opdracht = gekozenOpdracht;
    this.opdrachtForm.patchValue(gekozenOpdracht);

    this.opdrachtForm.controls['companyID'].setValue(gekozenOpdracht.companyID, {onlySelf: true});
    this.opdrachtForm.controls['closeDate'].setValue(gekozenOpdracht.closeDate);
    console.log(gekozenOpdracht.closeDate);
  }

  onSubmit() {
    if (this.opdracht == null) {
      this._opdrachtService.addAssignment(this.opdrachtForm.value).subscribe(result => {
        this.submitted = true;
        window.location.reload();
      }, error => {
        this.submitted = false;
        this.errorBool = true;
        this.errorMessage = 'Er is iets misgegaan bij het toevoegen.';
      });
    } else {
      const form = this.opdrachtForm.value;
      this.opdracht = new Assignment(this.opdracht.assignmentID, form.companyID, form.title, form.description, this.opdracht.closeDate);

      this._opdrachtService.updateAssignment(this.opdracht.assignmentID, this.opdracht).subscribe(result => {
        this.submitted = true;
        window.location.reload();
        this.clearOpdrachtForm();
      }, error => {
        this.submitted = false;
        this.errorBool = true;
        this.errorMessage = 'Er is iets misgegaan bij het wijzigen. Vul alle velden in.';
      });
    }
  }

  onCLickVerwijderOpdracht(gekozenOpdrachtID: number) {
    this._opdrachtService.deleteAssignment(gekozenOpdrachtID).subscribe();
    window.location.reload();
  }

  clearOpdrachtForm() {
    this.opdrachtForm.controls['title'].setValue('', {onlySelf: true});
    this.opdrachtForm.controls['companyID'].setValue('0', {onlySelf: true});
    this.opdrachtForm.controls['description'].setValue('', {onlySelf: true});
    this.opdrachtForm.controls['closeDate'].setValue('', {onlySelf: true});
    this.errorBool = false;
  }

  ngOnInit() {
  }

}

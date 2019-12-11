import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Tag} from '../../../models/tag.model';
import {Maker} from '../../../models/maker.model';
import {MakerService} from '../../../services/maker.service';
import {Company} from '../../../models/company.model';
import {BedrijfService} from '../../../services/bedrijf.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-gebruikers-beheren',
  templateUrl: './gebruikers-beheren.component.html',
  styleUrls: ['./gebruikers-beheren.component.scss']
})
export class GebruikersBeherenComponent implements OnInit {

  submitted: boolean = false;

  makerForm: FormGroup;
  bedrijfForm: FormGroup;

  makers: Observable<Maker[]>;
  bedrijven: Observable<Company[]>;

  maker: Maker;
  makerID: number;

  bedrijf: Company;
  companyID: number;

  constructor(private _makerService: MakerService, private _bedrijfService: BedrijfService) {
    this.makerForm = new FormGroup({
      typeID: new FormControl('', {validators: [Validators.required]}),
      userID: new FormControl('', {validators: [Validators.required]}),
      nickname: new FormControl('', {validators: [Validators.required]}),
      birthDate: new FormControl('', {validators: [Validators.required]}),
      biography: new FormControl('', {validators: [Validators.required]}),
      linkedIn: new FormControl('', {validators: [Validators.required]}),
      experience: new FormControl('', {validators: [Validators.required]}),
      contactInfo: new FormControl('', {validators: [Validators.required]})
    });

    this.bedrijfForm = new FormGroup({
      name: new FormControl('', {validators: [Validators.required]}),
      location: new FormControl('', {validators: [Validators.required]}),
      biographyCompany: new FormControl('', {validators: [Validators.required]})
    });

    this.makers = _makerService.getMakers();
    this.bedrijven = _bedrijfService.getCompanies();

    _makerService.getMaker(this.makerID).subscribe(result => {
      this.maker = result;
    });

    _bedrijfService.getCompany(this.companyID).subscribe(result => {
      this.bedrijf = result;
    });
  }

  onClickBewerkMaker(gekozenMaker: Maker) {
    this.maker = gekozenMaker;
  }

  onCLickToevoegenMaker() {
    this.maker = null;
  }

  onSubmitOpslaanMaker() {
    this.submitted = true;

    if (this.maker == null) {
      this._makerService.addMaker(this.makerForm.value).subscribe();
    } else {
      this._makerService.updateMaker(this.makerID, this.makerForm.value).subscribe();
    }
  }

  onClickBewerkBedrijf(gekozenBedrijf: Company) {
    this.bedrijf = gekozenBedrijf;
  }

  onCLickToevoegenBedrijf() {
    this.bedrijf = null;
  }

  onSubmitOpslaanBedrijf() {
    this.submitted = true;

    if (this.companyID == null) {
      this._bedrijfService.addCompany(this.bedrijfForm.value).subscribe();
    } else {
      this._bedrijfService.updateCompany(this.companyID, this.bedrijfForm.value).subscribe();
    }
  }

  ngOnInit() {
  }

}

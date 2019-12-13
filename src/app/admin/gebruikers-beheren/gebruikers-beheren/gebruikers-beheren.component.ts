import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Tag} from '../../../models/tag.model';
import {Maker} from '../../../models/maker.model';
import {MakerService} from '../../../services/maker.service';
import {Company} from '../../../models/company.model';
import {BedrijfService} from '../../../services/bedrijf.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GebruikerService} from '../../../services/gebruiker.service';
import {User} from '../../../models/user.model';
import {MakerType} from '../../../models/makerType';
import {MakerTypeService} from '../../../services/maker-type.service';

@Component({
  selector: 'app-gebruikers-beheren',
  templateUrl: './gebruikers-beheren.component.html',
  styleUrls: ['./gebruikers-beheren.component.scss']
})
export class GebruikersBeherenComponent implements OnInit {

  submitted: boolean = false;
  errorMessage: string = '';
  errorBool: boolean = false;

  makerForm: FormGroup;
  bedrijfForm: FormGroup;

  makers: Observable<Maker[]>;
  bedrijven: Observable<Company[]>;

  maker: Maker;
  makerID: number;

  bedrijf: Company;
  companyID: number;

  gebruikers: Observable<User[]>;
  makerTypes: Observable<MakerType[]>;

  constructor(private _makerService: MakerService,
              private _bedrijfService: BedrijfService,
              private _gebruikerService: GebruikerService,
              private _makerTypeService: MakerTypeService) {
    this.makerForm = new FormGroup({
      typeID: new FormControl(''),
      userID: new FormControl(''),
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
    this.gebruikers = _gebruikerService.getUsers();
    this.makerTypes = _makerTypeService.getMakerTypes();
  }

  onCLickToevoegenMaker() {
    this.maker = null;
  }

  onClickBewerkMaker(gekozenMaker: Maker) {
    this.maker = gekozenMaker;

  }

  onSubmitOpslaanMaker() {
    if (this.maker == null) {
      // console.log(this.makerForm.value);
      this._makerService.addMaker(this.makerForm.value).subscribe(result => {
        this.submitted = true;
        console.log(result);
      }, error => {
        console.log(error);
        this.submitted = false;
        this.errorBool = true;
        this.errorMessage = 'Er is iets misgegaan bij het toevoegen.';
      });
    } else {
      this._makerService.updateMaker(this.makerID, this.makerForm.value).subscribe(result => {
        this.submitted = true;
      }, error => {
        this.submitted = false;
        this.errorBool = true;
        this.errorMessage = 'Er is iets misgegaan bij het wijzigen.';
      });
    }
  }

  onCLickVerwijderMaker(gekozenMakerID: number) {
    this._makerService.deleteMaker(gekozenMakerID).subscribe();
  }

  onCLickToevoegenBedrijf() {
    this.bedrijf = null;
  }

  onClickBewerkBedrijf(gekozenBedrijf: Company) {
    this.bedrijf = gekozenBedrijf;
  }

  onSubmitOpslaanBedrijf() {
    this.submitted = true;

    if (this.bedrijf == null) {
      this._bedrijfService.addCompany(this.bedrijfForm.value).subscribe();
    } else {
      this._bedrijfService.updateCompany(this.companyID, this.bedrijfForm.value).subscribe();
    }
  }

  onCLickVerwijderBedrijf(gekozenBedrijfID: number) {
    this._bedrijfService.deleteCompany(gekozenBedrijfID).subscribe();
  }

  ngOnInit() {
  }

}

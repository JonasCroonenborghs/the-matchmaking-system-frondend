import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user.model';
import {GebruikerService} from '../../services/gebruiker.service';
import {Observable} from 'rxjs';
import {AuthenticateService} from '../../services/authenticate.service';
import {MakerService} from '../../services/maker.service';
import {BedrijfService} from '../../services/bedrijf.service';
import {Company} from '../../models/company.model';
import {Maker} from '../../models/maker.model';
import {MakerType} from '../../models/makerType';
import {MakerTypeService} from '../../services/maker-type.service';

@Component({
  selector: 'app-profiel',
  templateUrl: './profiel.component.html',
  styleUrls: ['./profiel.component.scss']
})
export class ProfielComponent implements OnInit {
  registrationForm: FormGroup;
  companyForm: FormGroup;
  makerForm: FormGroup;
  errorBool: boolean = false;
  errorMessage: string = '';
  submitted: boolean = false;
  myUser: User;
  roles: any;
  isCompany: boolean;
  isMaker: boolean;

  user: User;
  company: Company;
  maker: Maker;
  makerTypes: Observable<MakerType[]>;

  constructor(private _gebruikerService: GebruikerService, private _authenticateService: AuthenticateService,
              private _makerService: MakerService, private _bedrijfService: BedrijfService, private _makerTypeService: MakerTypeService) {
    this.registrationForm = new FormGroup({
      role: new FormControl('', {validators: [Validators.required]}),
      firstName: new FormControl('', {validators: [Validators.required]}),
      lastName: new FormControl('', {validators: [Validators.required]}),
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]}),
      oldPassword: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]})
    });

    this.companyForm = new FormGroup({
      companyName: new FormControl('', {validators: [Validators.required]}),
      companyLocation: new FormControl('', {validators: [Validators.required]}),
      companyBiography: new FormControl('', {validators: [Validators.required]})
    });

    this.makerForm = new FormGroup({
      makerTypeID: new FormControl('', {validators: [Validators.required]}),
      nickname: new FormControl('', {validators: [Validators.required]}),
      birthDate: new FormControl('', {validators: [Validators.required]}),
      biography: new FormControl('', {validators: [Validators.required]}),
      linkedIn: new FormControl('', {validators: [Validators.required]}),
      experience: new FormControl('', {validators: [Validators.required]}),
      contactInfo: new FormControl('', {validators: [Validators.required]})
    });

    this._authenticateService.currentUserRoleSubject.subscribe(result => {
      console.log(result);
      if (result == 'Company') {
        this.isCompany = true;
      }
      if (result == 'Maker') {
        this.isMaker = true;
      }
    });
  }

  ngOnInit() {
    this._gebruikerService.getCurrentUser().subscribe(
      user => this.registrationForm.patchValue(user)
    );

    this._gebruikerService.getCurrentUser().subscribe(
      user => this.myUser = user
    );

    this._gebruikerService.getUserRoles().subscribe(res => {
      this.roles = res;
    });

    // HIER MOET NOG DE USER ID INKOMEN IPV 1
    // GetCompanyByUserID en getMakerByUserID geven 404 not found 
    this._bedrijfService.getCompanyByUserID(1).subscribe(res => {
      this.company = res;
      this.companyForm.patchValue(this.company);
    });

    // HIER MOET NOG DE USER ID INKOMEN IPV 1
    this._makerService.getMakerByUserID(1).subscribe(res => {
      this.maker = res;
      this.makerForm.patchValue(this.maker);
    });

    this.makerTypes = this._makerTypeService.getMakerTypes();
  }

  onSubmit() {
    this.submitted = true;
    const form = this.registrationForm.value;
    const user: User = new User(this.myUser.userID, form.email, form.password, form.firstName, form.lastName, form.role, true);
    this._gebruikerService.updateGebruiker(form.oldPassword, user).subscribe(result => {
      console.log(result);
    }, error => {
      this.submitted = false;
      this.errorBool = true;
      //this.errormessage = JSON.stringify(error);
      //this.errormessage = error.error.message;
      this.errorMessage = 'Er ging iets mis, probeer opnieuw.';
    });
  }

  onSubmitCompany() {
    this.submitted = true;
    const form = this.companyForm.value;
    const company: Company = new Company(this.company.companyID, this.myUser.userID, form.companyName, form.companyLocation, form.companyBiography);
    this._bedrijfService.updateCompany(this.company.companyID, company).subscribe(result => {
      console.log(result);
    }, error => {
      this.submitted = false;
      this.errorBool = true;
      this.errorMessage = 'Er ging iets mis, probeer opnieuw.';
    });
  }

  onSubmitMaker() {
    this.submitted = true;
    const form = this.makerForm.value;
    const maker: Maker = new Maker(this.maker.makerID, form.makerTypeID, this.myUser.userID, form.nickname, form.birthdate, form.biography, form.linkedIn, form.experience, form.contactInfo);
    this._makerService.updateMaker(this.maker.makerID, maker).subscribe(result => {
      console.log(result);
    }, error => {
      this.submitted = false;
      this.errorBool = true;
      this.errorMessage = 'Er ging iets mis, probeer opnieuw.';
    });
  }

}

import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Tag} from '../../../models/tag.model';
import {Maker} from '../../../models/maker.model';
import {MakerService} from '../../../services/maker.service';
import {Company} from '../../../models/company.model';
import {BedrijfService} from '../../../services/bedrijf.service';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {GebruikerService} from '../../../services/gebruiker.service';
import {User} from '../../../models/user.model';
import {MakerType} from '../../../models/makerType';
import {MakerTypeService} from '../../../services/maker-type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gebruikers-beheren',
  templateUrl: './gebruikers-beheren.component.html',
  styleUrls: ['./gebruikers-beheren.component.scss']
})
export class GebruikersBeherenComponent implements OnInit {
  registrationForm: FormGroup;
  submitted: boolean = false;
  errorMessage: string = '';
  errorBool: boolean = false;
  title: string;

  makerForm: FormGroup;
  bedrijfForm: FormGroup;

  makers: Observable<Maker[]>;
  bedrijven: Observable<Company[]>;

  maker: Maker;
  makerID: number;

  bedrijf: Company;
  companyID: number;

  createMode : boolean = false;
  
  SelectMakerTypeID: any = '0';
  SelectUserID: any = '0';
  SelectUserRole: any = '0';

  user: User;


  admins: Observable<User[]>;
  Users: Observable<User[]>;
  Roles: any;
  makerTypes: Observable<MakerType[]>;

  constructor(private _makerService: MakerService,
              private _bedrijfService: BedrijfService,
              private _gebruikerService: GebruikerService,
              private _makerTypeService: MakerTypeService,
              private router: Router) {
    this.makerForm = new FormGroup({
      makerTypeID: new FormControl('', {validators: [Validators.required]}),
      userID: new FormControl('', {validators: [Validators.required]}),
      nickname: new FormControl('', {validators: [Validators.required]}),
      birthDate: new FormControl('', {validators: [Validators.required]}),
      biography: new FormControl('', {validators: [Validators.required]}),
      linkedIn: new FormControl('', {validators: [Validators.required]}),
      experience: new FormControl('', {validators: [Validators.required]}),
      contactInfo: new FormControl('', {validators: [Validators.required]})
    });

    this.registrationForm = new FormGroup({
      Role: new FormControl(),
      FirstName: new FormControl('', {validators: [Validators.required]}),
      LastName: new FormControl('', {validators: [Validators.required]}),
      Email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      Password: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]}),
      ControlPassword: new FormControl('', {validators: [Validators.required]})
    });

    this.bedrijfForm = new FormGroup({
      name: new FormControl('', {validators: [Validators.required]}),
      location: new FormControl('', {validators: [Validators.required]}),
      biographyCompany: new FormControl('', {validators: [Validators.required]})
    });

    this.makers = _makerService.getMakers();
    this.Users = _gebruikerService.getUsers();
    this.bedrijven = _bedrijfService.getCompanies();
    this.admins = _gebruikerService.getAdmins();
  }

  onClickBewerkMaker(gekozenMaker: Maker) {
    this.maker = gekozenMaker;
    this.makerTypes = this._makerTypeService.getMakerTypes();
    this.title = "Maker bewerken";
    this.makerForm.controls['makerTypeID'].setValue(gekozenMaker.makerTypeID, {onlySelf: true});
    this.makerForm.controls['birthDate'].setValue(new Date(new Date(gekozenMaker.birthDate).getDate()));

  }

  onSubmitOpslaanMaker() {
      this._makerService.updateMaker(this.makerID, this.makerForm.value).subscribe(result => {
        this.submitted = true;
      }, error => {
        this.submitted = false;
        this.errorBool = true;
        this.errorMessage = 'Er is iets misgegaan bij het wijzigen.';
      });
  }

  clearMakerForm(){
    this.makerForm.controls['makerTypeID'].setValue("0", {onlySelf: true});
    this.makerForm.controls['userID'].setValue("0", {onlySelf: true});
    this.makerForm.controls['nickname'].setValue("", {onlySelf: true});
    this.makerForm.controls['birthDate'].setValue("", {onlySelf: true});
    this.makerForm.controls['biography'].setValue("", {onlySelf: true});
    this.makerForm.controls['linkedIn'].setValue("", {onlySelf: true});
    this.makerForm.controls['experience'].setValue("", {onlySelf: true});
    this.makerForm.controls['contactInfo'].setValue("", {onlySelf: true});
  }
  
  onClickVerwijderMaker(gekozenMaker: Maker) {
    this.maker = gekozenMaker;
  }

  onCLickVerwijderMaker(gekozenMakerID: number) {
    this._makerService.deleteMaker(gekozenMakerID).subscribe();
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

  /*------------------------------
  ---------- Users ---------------
  ------------------------------*/

  onClickRegisterUser(){
    this.title = "Gebruiker toevoegen";
    this.createMode = true;
    this._gebruikerService.getUserRoles().subscribe(res => {
      this.Roles = res;
    });
  }

  onSubmitRegisterUser() {
    this.submitted = true;
    const form = this.registrationForm.value;
    console.log('FORM: ' + JSON.stringify(form));

    //const user = new User(0,form.firstName, form.lastName,form.email, Date.now().toLocaleString(), form.password, this.selectedRole);
    this.user = new User(0, form.Email, form.Password, form.FirstName, form.LastName, form.Role, false);
    
    // check password match
    if(form.ControlPassword != this.user.password){
      this.errorMessage = 'Wachtwoorden matchen niet.';
      this.errorBool = true;
      this.submitted = false;
      return;
    }

    this._gebruikerService.createUser(this.user).subscribe(result => {
        // this.showSavedMessage();
        this.clearUserForm();
        this.errorMessage = '';
      },
      error => {
        this.errorBool = true;
        this.submitted = false;
        console.log('ERROR: ' + JSON.stringify(error));
        this.errorMessage = 'Registration failed, please try again.';
      }
    );
    
    //window.location.reload();
    this.router.navigateByUrl('/gebruikersBeheren', { skipLocationChange: true }).then(() => {
      this.router.navigate(['gebruikersBeheren']);
    }); 
  }

  clearUserForm(){
    this.registrationForm.controls['makerTypeID'].setValue("0", {onlySelf: true});
    this.registrationForm.controls['Email'].setValue("", {onlySelf: true});
    this.registrationForm.controls['FirstName'].setValue("", {onlySelf: true});
    this.registrationForm.controls['LastName'].setValue("", {onlySelf: true});
    this.registrationForm.controls['Password'].setValue("", {onlySelf: true});
    this.registrationForm.controls['ControlPassword'].setValue("", {onlySelf: true});
  }

  ngOnInit() {

  }

}

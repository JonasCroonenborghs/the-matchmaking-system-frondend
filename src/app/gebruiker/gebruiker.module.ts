import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrerenComponent } from './registreren/registreren.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProfielComponent } from './profiel/profiel.component';
import { BedrijfProfielComponent } from './bedrijf-profiel/bedrijf-profiel.component';
import { MakerProfielComponent } from './maker-profiel/maker-profiel.component';



@NgModule({
  declarations: [LoginComponent, RegistrerenComponent, ProfielComponent, BedrijfProfielComponent, MakerProfielComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class GebruikerModule { }

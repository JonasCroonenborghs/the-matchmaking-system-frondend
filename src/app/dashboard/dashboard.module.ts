import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { InzendingenComponent } from './inzendingen/inzendingen.component';
import {FormsModule} from "@angular/forms";
import { GebruikerOpdrachtenComponent } from './gebruiker-opdrachten/gebruiker-opdrachten.component';
import { BedrijfOpdrachtenComponent } from './bedrijf-opdrachten/bedrijf-opdrachten.component';
import { FilterPipe } from './filter.pipe';



@NgModule({
  declarations: [DashboardComponent, HomeComponent,  InzendingenComponent, GebruikerOpdrachtenComponent, BedrijfOpdrachtenComponent, FilterPipe],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class DashboardModule { }

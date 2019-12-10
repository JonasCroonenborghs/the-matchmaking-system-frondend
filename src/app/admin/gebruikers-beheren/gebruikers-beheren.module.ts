import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GebruikersBeherenComponent } from './gebruikers-beheren/gebruikers-beheren.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [GebruikersBeherenComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class GebruikersBeherenModule { }

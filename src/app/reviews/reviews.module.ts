import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review/review.component';
import {ReactiveFormsModule} from '@angular/forms';
import { GebruikerReviewComponent } from './gebruiker-review/gebruiker-review.component';
import { BedrijfReviewComponent } from './bedrijf-review/bedrijf-review.component';



@NgModule({
  declarations: [ReviewComponent, GebruikerReviewComponent, BedrijfReviewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ReviewsModule { }

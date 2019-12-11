import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TagComponent} from './tag/tag.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AdminOpdrachtComponent} from './admin-opdracht/admin-opdracht.component';
import {GebruikersBeherenComponent} from './gebruikers-beheren/gebruikers-beheren/gebruikers-beheren.component';
import {ReviewsBeherenComponent} from './reviews-beheren/reviews-beheren/reviews-beheren.component';

@NgModule({
  declarations: [TagComponent, AdminOpdrachtComponent, GebruikersBeherenComponent, ReviewsBeherenComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AdminModule {
}

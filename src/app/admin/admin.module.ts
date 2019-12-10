import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './tag/tag.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AdminOpdrachtComponent } from './admin-opdracht/admin-opdracht.component';

@NgModule({
  declarations: [TagComponent, AdminOpdrachtComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }

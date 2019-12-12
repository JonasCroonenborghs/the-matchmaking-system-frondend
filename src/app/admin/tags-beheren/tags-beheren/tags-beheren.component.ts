import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Tag} from '../../../models/tag.model';
import {TagService} from '../../../services/tag.service';

@Component({
  selector: 'app-tags-beheren',
  templateUrl: './tags-beheren.component.html',
  styleUrls: ['./tags-beheren.component.scss']
})
export class TagsBeherenComponent implements OnInit {

  tagForm: FormGroup;
  errorBool: boolean = false;
  submitted: boolean = false;
  errorMessage: string = '';
  tags: Observable<Tag[]>;

  constructor(private _tagService: TagService) {
    this.tagForm = new FormGroup({
      name: new FormControl('', {validators: [Validators.required]})
    });

    this.tags = this._tagService.getTags();
  }

  onSubmit() {
    this.submitted = true;
    this._tagService.addTag(this.tagForm.value).subscribe();
  }

  ngOnInit() {
  }

}

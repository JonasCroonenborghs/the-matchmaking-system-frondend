import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { Maker } from '../../models/maker.model';
import { MakerService } from '../../services/maker.service';
import { Observable } from 'rxjs';
import { Tag } from '../../models/tag.model';

@Component({
  selector: 'app-maker-profiel',
  templateUrl: './maker-profiel.component.html',
  styleUrls: ['./maker-profiel.component.scss']
})
export class MakerProfielComponent implements OnInit {

  maker: Maker;
  makerID: number = 0;
  tags: Observable<Tag[]>;

  constructor(private _makerService: MakerService, private activatedRoute: ActivatedRoute) {
    activatedRoute.paramMap.subscribe(result => {
      console.log(result);
      this.makerID = new Number(result.get('makerID')).valueOf();
      console.log(this.makerID);
    })
    this._makerService.getMaker(this.makerID).subscribe(result => {
      this.maker = result;
    });
  }

  ngOnInit() {
  }

}

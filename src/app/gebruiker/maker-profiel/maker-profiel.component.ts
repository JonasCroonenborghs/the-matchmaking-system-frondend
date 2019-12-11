import {Component, OnInit} from '@angular/core';
import {Maker} from '../../models/maker.model';
import {MakerService} from '../../services/maker.service';
import {Observable} from 'rxjs';
import {Tag} from '../../models/tag.model';

@Component({
  selector: 'app-maker-profiel',
  templateUrl: './maker-profiel.component.html',
  styleUrls: ['./maker-profiel.component.scss']
})
export class MakerProfielComponent implements OnInit {

  maker: Maker;
  makerID: number;
  tags: Observable<Tag[]>;

  constructor(private _makerService: MakerService) {
    this.makerID = 1;
    this._makerService.getMaker(this.makerID).subscribe(result => {
      this.maker = result;
    });

    this.tags = this._makerService.getTagsByMakerID(this.makerID);
  }

  ngOnInit() {
  }

}

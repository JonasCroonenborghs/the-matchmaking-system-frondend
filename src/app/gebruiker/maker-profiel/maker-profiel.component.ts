import {Component, OnInit} from '@angular/core';
import {Maker} from '../../models/maker.model';
import {MakerService} from '../../services/maker.service';

@Component({
  selector: 'app-maker-profiel',
  templateUrl: './maker-profiel.component.html',
  styleUrls: ['./maker-profiel.component.scss']
})
export class MakerProfielComponent implements OnInit {

  public maker: Maker;
  public makerID: number;

  constructor(private _makerService: MakerService) {
    this.makerID = 1;
    this._makerService.getMaker(this.makerID).subscribe(result => {
      this.maker = result;
    });
  }

  ngOnInit() {
  }

}

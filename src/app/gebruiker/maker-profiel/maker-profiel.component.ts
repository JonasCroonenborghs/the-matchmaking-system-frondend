import { ActivatedRoute } from "@angular/router";
import {Component, Input, OnInit} from '@angular/core';
import { Maker } from '../../models/maker.model';
import { MakerService } from '../../services/maker.service';
import { Observable } from 'rxjs';
import { Tag } from '../../models/tag.model';
import {OpdrachtService} from '../../services/opdracht.service';

@Component({
  selector: 'app-maker-profiel',
  templateUrl: './maker-profiel.component.html',
  styleUrls: ['./maker-profiel.component.scss']
})
export class MakerProfielComponent implements OnInit {
  @Input() makerID : number;
  maker: Maker;
  tags: Observable<Tag[]>;
  temp:any;
  assignmentID : number = null;
  assignment:any;

  constructor(private _makerService: MakerService, private activatedRoute: ActivatedRoute, private _opdrachtService:OpdrachtService) {
    activatedRoute.paramMap.subscribe(result => {
      console.log(result);
      this.makerID = new Number(result.get('id1')).valueOf();
      this.assignmentID = new Number(result.get('id2')).valueOf();
      console.log("MAKERID:   "+this.makerID);
      console.log("AASIGNMENTID:  "+this.assignmentID);
    })
    this.tags = this._makerService.getTagsByMakerID(this.makerID);
  }

  ngOnInit() {
    this.temp = this.makerID;
    this._makerService.getMaker(this.temp).subscribe(result => {
      this.maker = result;
    });
  }

  updateAssignment() {
    this._opdrachtService.getAssignment(this.assignmentID).subscribe(res=>{
      res.makerID = this.makerID;
      this.assignment = res;
    });
    console.log(this.assignment);
    //this.assignment.makerID = this.makerID;
    this._opdrachtService.updateAssignment(this.assignmentID, this.assignment).subscribe(result => {
      console.log(result);
    })
  }
}

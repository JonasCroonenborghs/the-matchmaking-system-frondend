import {Component, Input, OnInit} from '@angular/core';
import {BedrijfService} from '../../services/bedrijf.service';
import {Company} from '../../models/company.model';
import {Observable} from 'rxjs';
import {Tag} from '../../models/tag.model';

@Component({
  selector: 'app-bedrijf-profiel',
  templateUrl: './bedrijf-profiel.component.html',
  styleUrls: ['./bedrijf-profiel.component.scss']
})
export class BedrijfProfielComponent implements OnInit {
  @Input() companyID: number;
  bedrijf: Company;

  tags: Observable<Tag[]>;

  constructor(private _bedrijfService: BedrijfService) {

    this._bedrijfService.getCompany(this.companyID).subscribe(result => {
      this.bedrijf = result;
    });

    this.tags = this._bedrijfService.getTagsByCompanyID(this.companyID);
  }

  ngOnInit() {
  }

}

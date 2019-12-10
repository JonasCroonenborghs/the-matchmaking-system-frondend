import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gebruiker-opdrachten',
  templateUrl: './gebruiker-opdrachten.component.html',
  styleUrls: ['./gebruiker-opdrachten.component.scss']
})
export class GebruikerOpdrachtenComponent implements OnInit {
  searchText : string = "";
  constructor() { }

  ngOnInit() {
  }

}

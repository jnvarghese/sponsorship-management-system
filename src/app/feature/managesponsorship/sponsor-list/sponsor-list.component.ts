import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponsor-list',
  templateUrl: './sponsor-list.component.html',
  styleUrls: ['./sponsor-list.component.css']
})
export class SponsorListComponent implements OnInit {

  constructor() { }
  SEARCH_RESULTS= [
    {id:1, name:'Sponsor One'},
    {id:2, name:'Sponson Two'},
    {id:3, name:'Sponsor Three'},
    {id:4, name:'Sponsor Four'},
    {id:5, name:'Sponsor Five'}
  ]
  ngOnInit() {
  }

}

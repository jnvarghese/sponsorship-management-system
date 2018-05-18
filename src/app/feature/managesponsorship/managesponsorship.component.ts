import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managesponsorship',
  templateUrl: './managesponsorship.component.html',
  styleUrls: ['./managesponsorship.component.css']
})
export class ManagesponsorshipComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/home/manage-sponsor', { outlets: { 'list': ['sponsor-manage-list'], 'detail': ['none'] } }]);
  }

}

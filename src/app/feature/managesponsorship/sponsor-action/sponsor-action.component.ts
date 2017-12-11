import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sponsor-action',
  templateUrl: './sponsor-action.component.html',
  styleUrls: ['./sponsor-action.component.css']
})
export class SponsorActionComponent implements OnInit {
  selectedChild: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: { id: string }) => {
      //this.childrenService.findChild(+params.id).subscribe((c) => {
          this.selectedChild = params.id
      //});
  });
  }

}

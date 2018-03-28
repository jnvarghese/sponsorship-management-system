import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <div class="container" >
      <app-header></app-header>
      <router-outlet></router-outlet>
      <app-footer></app-footer>
  </div>  
  
  `
})
export class HomeComponent implements OnInit {
 
  ngOnInit(): void {
    
  }
}

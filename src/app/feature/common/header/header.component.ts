import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`li > a.active {color: aquamarine}`]
})
export class HeaderComponent implements OnInit {

  userId:any; 
  constructor(private router: Router) { }

  ngOnInit() {
   this.userId = localStorage.getItem('userId');
   if(!this.userId){
     this.router.navigate(['/login']);
   }
  }

}

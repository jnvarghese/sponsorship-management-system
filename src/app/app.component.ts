import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn: boolean = false;
    
  constructor(private router: Router){}

  ngOnInit(): void {
    console.log(' App Component Router' ,this.router.config)
  }
}

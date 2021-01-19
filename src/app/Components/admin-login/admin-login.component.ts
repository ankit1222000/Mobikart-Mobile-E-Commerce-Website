import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
model:any={}
  constructor(private router: Router) { }

  ngOnInit(): void {
    window.scrollTo(0,0)
  }
  Login($event){
    
      this.router.navigate(['/adminDash']);
    

  }

}

import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,ParamMap} from '@angular/router';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  product_count:any
  constructor(private router:Router,private http:HttpClient) { }
  key:any
  loggeduser:any
  option:any
  email:any
  Logout(){
    localStorage.removeItem('user')
    this.router.navigate(['/'])
    if(window.location.href=="http://localhost:4200/") {
      window.location.reload()}
   
  }
  Order(){
    this.router.navigate(['/orders'])
  }
  ChangePassword(){
    this.router.navigate(['/changePassword'],{queryParams:{email:this.email}})
  }
  ngOnInit(): void {
    this.loggeduser=JSON.parse(localStorage.getItem('user'))
    if(this.loggeduser!=null){
      this.key=this.loggeduser[0].CUSTOMER_ID
    var stored=JSON.parse(localStorage.getItem(this.key))
    this.option="Welcome "+this.loggeduser[0].NAME
    this.email=this.loggeduser[0].EMAIL
      
    }
    if(this.loggeduser==null) this.option=''
   
    
    if(this.loggeduser==null || stored==null){
      this.product_count=0
    }
    
    else{
      
      this.product_count=stored.length
    }
    
  }

}

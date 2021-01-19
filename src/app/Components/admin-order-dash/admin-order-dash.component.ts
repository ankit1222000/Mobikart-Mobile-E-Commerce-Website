import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-order-dash',
  templateUrl: './admin-order-dash.component.html',
  styleUrls: ['./admin-order-dash.component.css']
})
export class AdminOrderDashComponent implements OnInit {
  models:any
  p:number=1
  search:any
  tableWidget:any
  x:number=0
  response:any
  constructor(private router:Router,private http:HttpClient) { }
    Delete(id){
      console.log(id)
      
      this.http.get('http://localhost:3000/deleteProduct/'+id).subscribe((res)=>{
        this.response=res
        if(this.response.success==true){
          this.ngOnInit()
        }
      })
    }
  ngOnInit(): void {
    window.scrollTo(0,0)
    this.http.get('http://localhost:3000/getAllProduct').subscribe((res)=>{
      
      this.models=res
      console.log(this.models)
      
    })
    
  }
  

}

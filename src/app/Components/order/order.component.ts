import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Router,ActivatedRoute,ParamMap} from '@angular/router';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }
  stored:any={}
  loggeduser:any=[]
 customer_id:any
  ngOnInit(): void {
    window.scrollTo(0,0)
    this.loggeduser=JSON.parse(localStorage.getItem('user'))
    console.log(this.loggeduser)
    this.customer_id=this.loggeduser[0].CUSTOMER_ID
    console.log(this.customer_id)
    this.http.post('http://localhost:3000/getAdminOrders',JSON.stringify({'id':this.customer_id}),{headers: new HttpHeaders({'Content-Type': 'application/json'})}).subscribe((res)=>{
      console.log("res",res)
      this.stored=res
      console.log(this.stored)
      for(let x=0;x<this.stored.length;x++){
        this.stored[x].PURCHASE_DATE=new Date(this.stored[x].PURCHASE_DATE)
      }
    })
  }

}

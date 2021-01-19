import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,ParamMap} from '@angular/router';
import {HttpClient,HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
 model:any={}
 newDate:any
 stored:any
 loggeduser:any
  constructor(private router:Router,private route:ActivatedRoute,private http:HttpClient) { }
  Shopping(){
    this.router.navigate(['/shop'])
  }
  Invoice($event,divName){
    var printContents = document.getElementById(divName).innerHTML;
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;
  }
  ngOnInit(): void {
   
    window.scrollTo(0,0)
    var time=this.route.snapshot.paramMap.get('time')
    this.loggeduser=JSON.parse(localStorage.getItem('user'))
    var customer_id=this.loggeduser[0].CUSTOMER_ID
    this.stored=JSON.parse(localStorage.getItem(customer_id))
    console.log("time",time)
    console.log("Logged User",this.loggeduser)
    console.log("Customer ID",customer_id)
    console.log("stored",this.stored)
    this.http.post('http://localhost:3000/getOrderData',JSON.stringify({customer:customer_id,puchase_time:time}),{headers: new HttpHeaders({'Content-Type': 'application/json'})}).subscribe((res)=>{
      this.model=res
      console.log("getOrderData Response",(this.model.data))
      this.newDate=new Date(this.model.data[0].PURCHASE_DATE)
      
      
     
     
      
      
    })
    localStorage.removeItem(customer_id)
  }

}

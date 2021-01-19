import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Router,ActivatedRoute,ParamMap} from '@angular/router';
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  model:any={}
  result:any={}
  emailSend:any
  emailid:any
  constructor(private http:HttpClient,private router:Router) { }
  CustomerEmail(regForm:any){
    this.emailid=this.model.email
    console.log(JSON.stringify(this.emailid))
    this.http.post('http://localhost:3000/sendEmail',JSON.stringify(this.model),{headers: new HttpHeaders({'Content-Type': 'application/json'})}).subscribe((res)=>{
      this.result=res
      if(this.result.success==true) {
        this.emailSend="Password Has been Sent to Your Email Successfully"
        setTimeout(()=>{this.router.navigate(['/'])},2000)
      }
      else this.emailSend="Email Does not Exist"
    })
  }
  ngOnInit(): void {
  }

}

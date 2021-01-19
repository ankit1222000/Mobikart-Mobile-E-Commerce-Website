import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Router,ActivatedRoute,ParamMap} from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  model:any={}
  passwordalert:any
  emailer:any
  result:any
  
  constructor(private router:Router,private route:ActivatedRoute,private http:HttpClient) { }
  ChangePassword(regForm:any){
    var password=this.model.Password
    var cnfrmpassword=this.model.ConfirmPassword
    console.log(password,cnfrmpassword)
    if(this.model.Password!=this.model.ConfirmPassword){
      this.passwordalert="Invalid Password, both the Passwords should be Same"
    }
    else{
      console.log(JSON.stringify(this.model))
      this.http.post('http://localhost:3000/changePassword',JSON.stringify(this.model),{headers: new HttpHeaders({'Content-Type': 'application/json'})}).subscribe((res)=>{
        this.result=res
        if(this.result.success==true) this.router.navigate(['/login'])
        else this.passwordalert="Invalid Password ! Old Password is Incorrect"
      })
    }
  }
  ngOnInit(): void {
    this.emailer=this.route.snapshot.queryParamMap.get('email')
    this.model["email"]=this.emailer
    console.log(this.emailer)
  }

}

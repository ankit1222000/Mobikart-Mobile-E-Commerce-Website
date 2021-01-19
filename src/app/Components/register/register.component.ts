import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model:any={}
  phonealert:any
  passwordalert:any
  result:any
  RegisterCustomer(regForm:any){
    if(this.model.Phone.length<10 || this.model.Password!=this.model.ConfirmPassword ){
    if(this.model.Phone.length<10){
      this.phonealert="Invalid Number, Enter Valid Phone Number"
    }
    if(this.model.Password!=this.model.ConfirmPassword){
      this.passwordalert="Invalid Password, both the Passwords should be Same"
    }
  }
  else{
    const data=JSON.stringify(this.model)
    this.http.post('http://localhost:3000/processRegister',data,{headers: new HttpHeaders({'Content-Type': 'application/json'})}).subscribe((res)=>{
      //console.log("Response",res);
      this.result=res
      if(this.result.success==false) this.passwordalert="Your Account Already Exists, Please Login!"
      else this.router.navigate(['/login'])
    })
    
    //console.log(data) 
  }
    
    
  }
  constructor(private http:HttpClient,private router: Router) { }

  ngOnInit(): void {
    window.scrollTo(0,0)
  }

}

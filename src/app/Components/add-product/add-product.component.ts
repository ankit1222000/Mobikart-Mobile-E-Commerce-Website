import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})


export class AddProductComponent implements OnInit {
 model:any={}
 fileToUpload: File = null;
 handleFileInput(files:FileList){
   this.fileToUpload=files.item(0);
   console.log(this.fileToUpload);
   const formData: FormData = new FormData();
   formData.append('Image', this.fileToUpload);
   this.http.post('http://localhost:3000/upload',formData).subscribe((res)=>{
      console.log(res);
    });
 }

  constructor(private http:HttpClient,private router: Router) { 
  }
  durations=[{ title: "15 seconds", value: 15 }, 
    { title: "30 seconds", value: 30 }] 
  
  AddProduct(regform:any)
 {
  
   /*var firstname=regform.controls.first.value;
   var secondname=regform.controls.second.value;
   var address=regform.controls.address.value;
   var city=regform.controls.city.value;
   var gender=regform.controls.gender.value;
   alert(firstname+" "+secondname+" "+gender+" "+address+" "+city);*/
    //console.log(this.model);
    /*const data=JSON.stringify(this.model);
    console.log(data);
    this.http.post('http://localhost:3000/process',data,{headers: new HttpHeaders({'Content-Type': 'application/json'})}).subscribe((res)=>{
      console.log(res);
    });*/
    const data=JSON.stringify(this.model);
    console.log("Data hai",data);
   
    this.http.post('http://localhost:3000/process',data,{headers: new HttpHeaders({'Content-Type': 'application/json'})}).subscribe((res)=>{
      console.log(res);
      this.router.navigate(['/adminDash']);
    });
    
   }

  ngOnInit(): void {
    window.scrollTo(0,0)
  }
  

}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private router:Router,private http:HttpClient) { }
  states=["Andaman and Nicobar Islands","Andhra Pradesh","Arunachal Pradesh", "Assam","Bihar","Chandigarh","Chhattisgarh","Delhi","Goa","Gujarat","Haryana", "Himachal Pradesh",
"Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Lakshadweep","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Puducherry","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"]
  model:any={}
  pin:any=""
  locality:any=""
  address:any=""
  city:any=""
  state:any=""
  type:any=""
  stored:any
  response:any
  address_data:any
  total:any=0
  order:any={}

  CheckoutProduct(regform:any){
    console.log("chala")
    var loggeduser=JSON.parse(localStorage.getItem('user'))
    console.log("logged user",loggeduser)
    var customer_id=loggeduser[0].CUSTOMER_ID;
    var stored=JSON.parse(localStorage.getItem(customer_id))
    console.log("Stored",stored)
    this.model["customer_id"]=customer_id;
    
    console.log(customer_id)
    //console.log(JSON.stringify(this.model));
    const data=JSON.stringify(this.model);
    console.log("Data",data);
    this.http.post('http://localhost:3000/updateAddress',data,{headers: new HttpHeaders({'Content-Type': 'application/json'})}).subscribe((res)=>{
      //console.log("Response",res);
      
    });
    this.order["customer_id"]=customer_id
    this.order["customer_name"]=loggeduser[0].NAME
    this.order["payment_mode"]=this.model.payment;
    this.order["email"]=loggeduser[0].EMAIL
    this.order["phone"]=loggeduser[0].PHONE

    this.order["product"]=[]
    for(let x=0;x<stored.length;x++)
    {
      this.order["product"].push({product:stored[x][0].company+' '+stored[x][0].name+' '+stored[x][0].colour+' '+stored[x][0].variant,price:stored[x][0].price,image:stored[x][0].image})
    }

    var orderdata=JSON.stringify(this.order)
    console.log(orderdata)
    this.http.post('http://localhost:3000/setOrders',orderdata,{headers: new HttpHeaders({'Content-Type': 'application/json'})}).subscribe((res)=>{
      this.response=res
     
      this.router.navigate(['/confirmation',{time:this.response.purchase_time}])
      
    })
   
  }
  ngOnInit(): void {
    window.scrollTo(0,0)
    var loggeduser=JSON.parse(localStorage.getItem('user'))
    var customer_id=loggeduser[0].CUSTOMER_ID;
    this.http.get('http://localhost:3000/getAddress/'+customer_id).subscribe((res)=>{
      
      this.address_data=res
      console.log("Response init",this.address_data)
      if(this.address_data.success==true){
        console.log('Response Data',this.address_data.data[0])
        this.pin=this.address_data.data[0].pincode
        this.locality=this.address_data.data[0].locality
        this.address=this.address_data.data[0].address
        this.city=this.address_data.data[0].city
        this.state=this.address_data.data[0].state
        this.type=this.address_data.data[0].address_type
        this.model=this.address_data.data[0]
      }
      else{
        console.log(res)
      }
      
    })
    var user=JSON.parse(localStorage.getItem('user'))
    var key=user[0].CUSTOMER_ID;
    //console.log("Key ki value",this.key)
    //console.log("CUSTOMER ID Wali Key",this.key[0].CUSTOMER_ID)
    this.stored = JSON.parse(localStorage.getItem(key));
    console.log("Stored",this.stored)
    for(let i=0;i<this.stored.length;i++){
      if(this.stored[i][0].price>499){
        this.total=this.total+this.stored[i][0].price
      }
      else this.total=this.total+this.stored[i][0].price+500
      }
  
    
  }

}

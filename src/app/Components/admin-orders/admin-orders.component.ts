import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';


@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
 result:any
 rowData:any;
  constructor(private http:HttpClient,private router:Router) { 
   
  }

  ngOnInit(): void {
    window.scrollTo(0,0)
     this.http.post('http://localhost:3000/getAdminOrders',JSON.stringify({'id':1}),{headers: new HttpHeaders({'Content-Type': 'application/json'})}).subscribe((res)=>{
      this.result=res
      for(let x=0;x<this.result.length;x++){
        this.result[x].PURCHASE_DATE=new Date(this.result[x].PURCHASE_DATE).toString().split("00")[0]
        this.result[x].PRODUCT_PRICE=(this.result[x].PRODUCT_PRICE).toLocaleString('en-US', {
          style: 'currency',
          currency: 'INR',
        });
      }
      this.rowData=this.result
    })
  }
  columnDefs = [
    {headerName: 'Date', field: 'PURCHASE_DATE' ,sortable:true,filter:true,sortingOrder:["asc","desc"],width:150},
    {headerName: 'Time', field: 'PURCHASE_TIME' ,sortable:true,filter:true,sortingOrder:["asc","desc"],width:90},
    {headerName: 'Order ID', field: 'ORDER_ID',filter:true,width:120},
    {headerName: 'Customer Name', field: 'CUSTOMER_NAME' ,sortable:true,filter:true,sortingOrder:["asc","desc"]},
    {headerName: 'Product Purchased', field: 'PRODUCT_PURCHASED', sortable:true,filter:true,resizable:true, width: 350 },
    {headerName: 'Price', field: 'PRODUCT_PRICE',sortable:true,filter:true,width:130},
    {headerName: 'Mobile', field: 'PHONE',filter:true,width:130},
    {headerName: 'Email', field: 'EMAIL', filter:true},
    {headerName: 'Address', field: 'ADDRESS',filter:true,resizable:true,width:800},
    
    //{headerName: 'Phone No.', field: 'phone', sortable:true,filter:true},
    // {headerName: 'Gender', field: 'gender', sortable:true,filter:true},
    // //{headerName: 'Age', field: 'age', sortable:true,filter:true},
    // {headerName: 'Address', field: 'address', sortable:true,filter:true,resizable:true},
    // {headerName: 'City', field: 'city', sortable:true,filter:true}
  ];
  
 
}

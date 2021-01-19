import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,ParamMap} from '@angular/router';
import {HttpClient,HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  stored:any
  total:any=0
  items:any
  i:number=0
  key:any
  constructor(private router:Router) { }
  DeleteAll($event){
    localStorage.removeItem(this.key);
    
    console.log("Key wala Local",JSON.parse(localStorage.getItem(this.key)))
    console.log("User wala Local",JSON.parse(localStorage.getItem('user')))
    window.location.reload()
  }
  Delete($event,namer){
    console.log(namer);
   
    this.items = JSON.parse(localStorage.getItem(this.key));
    console.log("Original stored",this.items)
    for(;this.i<this.stored.length;this.i++){
      if(this.stored[this.i][0].name==namer) break
      
    }
    //console.log("Index is",this.i)
    
    
    this.items.splice(this.i, 1);
    this.stored=this.items;
    localStorage.setItem(this.key,JSON.stringify(this.stored));
    console.log("Items After Splice",this.stored)
    window.location.reload();
    
  }

  ngOnInit(): void {
    window.scrollTo(0,0)
    var user=JSON.parse(localStorage.getItem('user'))
    this.key=user[0].CUSTOMER_ID;
    //console.log("Key ki value",this.key)
    //console.log("CUSTOMER ID Wali Key",this.key[0].CUSTOMER_ID)
    this.stored = JSON.parse(localStorage.getItem(this.key));
    console.log(this.stored)
    if(this.stored!=null){
    for(let i=0;i<this.stored.length;i++){
    if(this.stored[i][0].price>499){
      this.total=this.total+this.stored[i][0].price
    }
    else this.total=this.total+this.stored[i][0].price+500
    }
  }
    console.log(this.total);
    
  }

}

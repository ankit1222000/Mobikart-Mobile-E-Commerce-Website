import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import * as $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  models:any=[]

  constructor(private router:Router,private http:HttpClient) {
    window.scrollTo(0, 0);
   }
  toggleMute(myVideo){
    
    let video = <HTMLVideoElement> document.getElementById(myVideo);
    
    video.muted = !video.muted;
  }
 
  ngOnInit(): void {
    window.scrollTo(0,0)
    this.http.get('http://localhost:3000/getLimitData/8').subscribe((res)=>{
      //console.log(res);
      this.models=res;
      console.log(this.models)
      console.log(JSON.parse(localStorage.getItem('user')))
      console.log(JSON.parse(localStorage.getItem('101')))
    });
    
  }

}

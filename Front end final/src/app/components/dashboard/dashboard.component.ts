import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loginDetails:any=null
  userDetails:any;

  constructor(
    private userService:UserService,
    private router: Router
  ) {
    var loginDetails = localStorage.getItem("loginDetails")
    if(loginDetails!= undefined){
      this.userDetails = JSON.parse(loginDetails);
    }

    if(this.userDetails.type=="user"){
      this.router.navigate(["/dashboard/history"])
    }
    else{
      this.router.navigate(["/dashboard/book"])
    }

   }

  ngOnInit(): void {
  }

  logout(){
    this.userService.logout();


  }

}

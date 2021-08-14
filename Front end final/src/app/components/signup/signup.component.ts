import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  emailId:any="";
  password:any="";
  name:any="";
  errorMessage: any = "";
  userType:string="staff";
  constructor(
    private userService:UserService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  signup(){
    if(this.validateSignup()){
      this.userService.signUp(this.emailId,this.password,this.name, this.userType).subscribe((data)=>{
        if(data.status){
          alert("You have successfully signed.")
          this.router.navigate(["/login"]);
        }else{
          alert("Failed to signup. Please check details again.")
        }
      })
    }

  }

  validateSignup(){
    this.errorMessage = "";
    if(this.emailId.trim()==""){
      this.errorMessage = "email id should not be blank";
      return false;
    }

    if(this.password.trim()==""){
      this.errorMessage = "password should not be blank";
      return false;
    }

    return true;
  }

}

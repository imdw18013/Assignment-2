import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { UserService } from 'src/app/_services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  [x: string]: any;

  public emailId:any="";
  public password:any="";
  public errorMessage:any="";

  googleLoginOptions = {
    scope: 'profile email'
  }; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig


  config = [
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider("Google-OAuth-Client-Id", this.googleLoginOptions)
    }
  ]

  constructor(
    private userService:UserService,
    public router: Router,
    private authService: SocialAuthService
  ) { 

  }

  
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      console.log("user after signin", user)
      this.user = user;
      if(user != null){
        this.userService.getUserDetail(user.email).subscribe((data)=>{
          if(data.status && data.details.length >0){
            localStorage.setItem("loginDetails",JSON.stringify(data.details));
            this.router.navigate(['/dashboard/history']);
          }else{
            this.userService.signUp(user.email,"12345",user.name,"user").subscribe((data)=>{
              if(data.status){
                localStorage.setItem("loginDetails",JSON.stringify(data.details));
                this.router.navigate(['/dashboard/history'])
              }else{
                alert("failed to create account. Please try again after refresh page.")
              }
            },(error)=>{

            })
          }
        },(error)=>{
          alert("Failed to login with google. Try again after refresh.");

        })
      }
    });
  }

  login(){
    if(this.validateLogin()){
      this.userService.login(this.emailId, this.password).subscribe((data)=>{
        if(data.status){
          var loginDetails = data.details[0];
          localStorage.setItem("loginDetails",JSON.stringify(loginDetails));
          if(loginDetails.type == "user")
            this.router.navigate(['/dashboard/history']);
          else
            this.router.navigate(["/dashboard/book"]);
        }else{
          alert(data.message)
        }
      },(error)=>{
        alert("Please contact to admin.")
      })
    }


  }

  validateLogin() {
    this.errorMessage = "";
    if(this.emailId.trim() == ""){
      this.errorMessage = "email id should not blank"
      return false;
    }
    if(this.password.trim()==""){
      this.errorMessage = "password should not blank";
      return false
    }

    return true;
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

}



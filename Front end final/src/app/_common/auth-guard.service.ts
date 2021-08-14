import { unescapeIdentifier } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public router: Router
  ) { }

  canActivate(): boolean {
    if(!this.isAuthenticated()){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }


  isAuthenticated(){
    var loginDetails = localStorage.getItem('loginDetails');
    if(loginDetails != undefined){
      return true;
    }
    return false
  }

}

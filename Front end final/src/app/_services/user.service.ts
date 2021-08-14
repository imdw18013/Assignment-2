import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private route : Router
  ) { }


  login(emailId: any, password: any) {
   
    return this.http.post<any>(environment.serverApi + "users/login", { emailId: emailId, password:password })
  }

  logout() {
    localStorage.removeItem('loginDetails');
    this.route.navigate(['/login'])
  }

  signUp(emailId: any, password: any,name:any, userType:any) {
    return this.http.post<any>(environment.serverApi + "users/add", { emailId: emailId, password:password,name:name, type:userType })
  }

  getUserDetail(emailId:any){
    const param = new HttpParams().set("emailId", emailId)
    return this.http.get<any>(environment.serverApi + "users/getDetails",{params:param})
  }
}

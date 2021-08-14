import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http:HttpClient
  ) { }

  add(body:any){
    return this.http.post<any>(environment.serverApi+"property/add",body)
  }

  delete(bookId:any){
    const param = new HttpParams().set("bookId",bookId)
    return this.http.delete<any>(environment.serverApi+"property/delete",{params:param})

  }

  update(body:any){
    return this.http.post<any>(environment.serverApi+"property/update",body)
  }

  getDetail(bookId:string){
    const param = new HttpParams().set("bookId",bookId)
    return this.http.get<any>(environment.serverApi+"property/getDetails",{params:param});

  }

  getAllBookList(){
    return this.http.get<any>(environment.serverApi+"property/getall");

  }

  searchBook(searchKey:string){
    return this.http.post<any>(environment.serverApi+"property/search",{bookName:searchKey});
  }

}

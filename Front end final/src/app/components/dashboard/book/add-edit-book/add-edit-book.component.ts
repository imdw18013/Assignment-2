import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.css']
})
export class AddEditBookComponent implements OnInit {
  bookId: any = 0;
  bookName: any;
  bookAuthor: any;
  bookPrice: any;
  errorMessage: string = "";

  propertyId: any = 0;
  price: any;
  status: any;
  location: any;
  area: any;
  ownername:any;

  userDetails:any;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {
    this.route.params.subscribe((param) => {
      if (param['id']) {
        this.bookId = param['id'];
      }
    })
    this.location= "2300";
    this.userDetails = localStorage.getItem('loginDetails');
  }

  ngOnInit(): void {
    if (this.bookId != 0) {
      this.bookService.getDetail(this.bookId).subscribe((data) => {
        var result = data.result[0];
        this.price = result.price;
        this.area = result.area;
        this.location = result.location.
          this.propertyId = result._id;
        this.status = result.status;
      });
    }
  }
  reset() {
    this.propertyId = 0;
    this.price = "";
    this.status = true;
    this.location = "";
    this.area = "";
  }
  save() {
    this.errorMessage = "";

    if(this.userDetails==undefined){
      this.errorMessage = "Please login to add property";
      return;
    }



    var body = {
      "propertyId": this.propertyId,
      "ownername" : JSON.parse(this.userDetails)["_id"],
      "location": this.location,
      "area": this.area,
      "price": this.price,
      "status": this.status
    }
    console.log("body", body)
    if (this.propertyId != 0) {
      this.bookService.update(body).subscribe((data) => {
        if (data.status) {
          this.errorMessage = data.message
        } else {
          this.errorMessage = data.message
        }
      })

    } else {
      this.bookService.add(body).subscribe((data) => {
        if (data.status) {
          this.bookId = data.result._id;
          this.errorMessage = data.message
        } else {
          this.errorMessage = data.message
        }
      })
    }

  }

}

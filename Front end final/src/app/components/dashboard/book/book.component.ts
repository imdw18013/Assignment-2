import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {


  bookList: any;
  issuedBookIds: any = [];
  searchKey: any = "";
  showModal: boolean = false;

  selectedBookId: any;
  selectedEmailId: any;
  selectedBookName: any;
  issueErrorMessage: any = "";


  propertyList:any;

  constructor(private bookService: BookService) {
    this.getBookList();

  }

  ngOnInit(): void {
  }

  deleteBook(bookId: any) {

    var userAction = confirm("are you want to delete this book");
    if (userAction) {
      this.bookService.delete(bookId).subscribe((data) => {
        debugger;
        this.getBookList()
      })
    }
  }

  getBookList() {
    this.bookService.getAllBookList().subscribe((data) => {
      if (data.status) {
        console.log("details ", data)
        // this.bookList = data.result.bookDetails;
        // this.issuedBookIds = data.result.issuedBookIds;
        // this.bookList.map((dt: any) => {
        //   debugger;
        //   if (this.issuedBookIds.includes(dt._id)) {
        //     dt.status = true;
        //   } else {
        //     dt.status = false;
        //   }
        //   return dt;
        // })
        this.propertyList = data.result.propertyDetails;
      }
      else {
        this.bookList = []
      }

    });
  }

  search() {
    if (this.searchKey == "") {
      alert("Please enter book name to search");
    } else {
      this.bookService.searchBook(this.searchKey).subscribe((data) => {
        if (data.result.bookDetails.length == 0) {
          this.bookList = [];
        }
        else {
          this.bookList = data.result.bookDetails;
          this.issuedBookIds = data.result.issuedBookIds;
          this.bookList = this.bookList.map((dt: any) => {
            if (this.issuedBookIds.includes(dt._id)) {
              dt.status = true;
            } else {
              dt.status = false;
            }
            return dt;
          })
        }
      }, (error) => {
        this.bookList = [];
        console.log(error)
      });

    }

  }

  clearSearch() {
    this.getBookList();
    this.searchKey = "";
  }

  hide() {
    this.selectedBookId = ""
    this.selectedBookName = "";
    this.selectedEmailId = "";
    this.issueErrorMessage = "";
    this.showModal = false;
  }

  show(bookId: any, bookName: any) {
    this.selectedBookId = bookId
    this.selectedBookName = bookName;
    this.selectedEmailId = "";
    this.showModal = true;
  }
}

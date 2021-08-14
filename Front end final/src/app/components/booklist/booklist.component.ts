import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

  bookList:any;
  propertyList:any;
  constructor(
    private bookService: BookService
  ) {

    this.getBookList();
   }

  ngOnInit(): void {
  }

  getBookList() {
    this.bookService.getAllBookList().subscribe((data) => {
      if (data.status) {
        this.propertyList = data.result.propertyDetails;
      }
      else {
        this.propertyList = []
      }
    });
  }

}

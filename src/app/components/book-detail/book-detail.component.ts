import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BooksService } from "../../services/books.service";
import { Observable } from "rxjs/Observable";
@Component({
  selector: "app-book-detail",
  templateUrl: "./book-detail.component.html",
  styleUrls: ["./book-detail.component.css"]
})
export class BookDetailComponent implements OnInit {
  bookID: string;
  book;
  constructor(private route: ActivatedRoute, private bookService: BooksService) {
    this.route.url.subscribe(url => {
      this.bookID = url[1].path;
      this.bookDetail();
 });
  }

  ngOnInit() {
    console.log(this.bookID);
  }

  bookDetail() {
    this.book = this.bookService.getBookDetail(this.bookID);
  }
}

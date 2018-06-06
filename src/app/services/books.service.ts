import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpModule, Http } from '@angular/http';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Injectable()
export class BooksService {
  books: Observable<any>;
  booksArray = [];
  constructor(private db: AngularFireDatabase, private router: Router) {
    this.db
      .list('books')
      .valueChanges()
      .subscribe(response => {
        this.booksArray = Object.values(response);
      });
  }

  getAllBooks() {
    this.books = this.db.list('books').valueChanges();
    this.db
      .list('books')
      .valueChanges()
      .subscribe(response => {
        this.booksArray = response;
      });
    return this.books;
  }

  getAllBooksInArray() {
    return this.booksArray;
  }

  getBookDetail(id) {
    console.log(this.booksArray)
    return this.booksArray.filter(book => {
      if (book.id == id) {
        return book;
      }
    });
  }

  addBook(bookData) {
    console.log(bookData);
    const itemRef = this.db.list('books');
    itemRef.push(bookData);
    this.router.navigate(['/']);
  }

  takeBook(isbn, uid) {
    const itemRef = this.db.list('books-recived/' + uid);
    itemRef.push(isbn);
  }

  alreadyTaken(uid) {
    return this.db.list('books-recived/' + uid).valueChanges();
  }

  returnBook(isbn, uid) {
    const itemRef = this.db.list('books-recived/' + uid).snapshotChanges();
    itemRef.subscribe(actions => {
      actions.forEach(action => {
        if (action.payload.val() === isbn) {
          const key = action.key;
          const itemsRef = this.db.list('books-recived/' + uid);
          itemsRef.remove(key);
        }
      });
    });
  }
}

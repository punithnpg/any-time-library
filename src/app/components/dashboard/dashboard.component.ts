import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  ViewChildren
} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { BooksService } from '../../services/books.service';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  categories = [];
  filterCategories = [];
  @ViewChildren('check') categoryIdentifier;
  mobileQuery: MediaQueryList;
  fillerNav = Array(50)
    .fill(0)
    .map((_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener: () => void;
  private UserName;
  private currentUser;
  books: Observable<any[]>;
  booksTaken = [];
  loadingBooks = false;
  public isAdmin: Observable<boolean>;
  constructor(
    public afAuth: AngularFireAuth,
    private bookService: BooksService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.UserName = user;
      }
      this.authService.isAdmin(this.UserName.uid).subscribe(userDetail => {
        this.isAdmin = userDetail.roles['admin'];
      });
      this.bookService.alreadyTaken(this.UserName.uid).subscribe(booksTaken => {
        this.booksTaken = booksTaken;
        this.loadingBooks = true;
        this.books = this.bookService.getAllBooks().do(books => {
          books.forEach(element => {
            if (_.indexOf(this.booksTaken, element.isbn) !== -1) {
              element['taken'] = true;
            }
            this.loadingBooks = false;
            console.log(books);
            console.log(this.booksTaken);
          });
        });
        this.getAllCategories();
      });
    });
  }

  ngOnInit() {}

  logout() {
    this.afAuth.auth
      .signOut()
      .then(res => this.router.navigate(['auth/login']));
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getAllCategories(): any {
    this.bookService.getAllBooks().subscribe(response => {
      response.map(res => {
        if (this.categories.includes(res.categories)) {
        } else {
          this.categories.push(res.categories);
        }
      });
    });
  }
  filterBooks(event, category) {
    if (event.checked) {
      this.filterCategories.push(category);
      this.books = this.bookService.getAllBooks();
      this.books = this.books.map(books =>
        books.filter(book => {
          for (let i = 0; i < this.filterCategories.length; i++) {
            if (
              this.filterCategories[i].toLowerCase() ===
              book.categories.toLowerCase()
            ) {
              return true;
            }
          }
          return false;
        })
      );
    } else {
      this.filterCategories = this.filterCategories.filter(
        result => result !== category
      );
      this.books = this.bookService.getAllBooks();
      this.books = this.books.map(books =>
        books.filter(book => {
          for (let i = 0; i < this.filterCategories.length; i++) {
            if (
              this.filterCategories[i].toLowerCase() ===
              book.categories.toLowerCase()
            ) {
              return true;
            }
          }
          return false;
        })
      );
    }
    if (this.filterCategories.length === 0) {
      this.books = this.bookService.getAllBooks();
    }
  }
  clearFilter() {
    this.books = this.bookService.getAllBooks();
    const unCheck = this.categoryIdentifier;
    unCheck.map(res => {
      if (res.checked === true) {
        res.checked = false;
      }
    });
  }

  takeBook(bookISBN) {
    const ref = this.bookService.alreadyTaken(this.UserName.uid);
    const refSubscription = ref.subscribe(isbn => {
      console.log(isbn);
      if (_.indexOf(isbn, bookISBN) == -1) {
        this.bookService.takeBook(bookISBN, this.UserName.uid);
        refSubscription.unsubscribe();
      } else {
        console.log(isbn);
        console.log(bookISBN);
        console.log('already took  ');
        refSubscription.unsubscribe();
      }
    });
  }

  returnBook(isbn) {
    this.bookService.returnBook(isbn, this.UserName.uid);
  }
}

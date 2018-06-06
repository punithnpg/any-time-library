import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../../services/auth.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  fillerNav = Array(50)
    .fill(0)
    .map((_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener: () => void;
  public user;
 public isAdmin: Observable<boolean>;
  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private bookService: BooksService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
      }
      this.authService.isAdmin(this.user.uid).subscribe(userDetail =>{
        this.isAdmin = userDetail.roles['admin'];
      });
    });

  }

  logout() {
    this.afAuth.auth
      .signOut()
      .then(res => this.router.navigate(['auth/login']));
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}

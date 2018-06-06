import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { User } from '../modules/user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthService {
  user: BehaviorSubject<User> = new BehaviorSubject(null);
  private loogedInUser: Observable<firebase.User>;
  userDetails: firebase.User = null;
  authUser: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.userDetails = auth;
        this.db
          .object<User>('users/' + auth.uid)
          .valueChanges()
          .subscribe(user => {
            this.user.next(user);
          });
      }
    });
  }

  getUser() {
    return this.userDetails;
  }

  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateUser(credential.user);
    });
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  createUser(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  updateUser(authData) {
    const userData = new User(authData);
    const itemRef = this.db.object('users/' + authData.uid).valueChanges();
    itemRef.take(1).subscribe(user => {
      if (!user) {
        const ref = this.db.list('users');
        ref.set(authData.uid, userData);
      } else {
        console.log('Already there');
      }
    });
  }

  isAdmin(uid): Observable<any> {
    return this.db.object('users/' + uid).valueChanges();
  }
}

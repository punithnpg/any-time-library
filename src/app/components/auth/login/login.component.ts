import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   user: Observable<firebase.User>;
   userDetails: firebase.User = null;
  loginForm: FormGroup;
  logging:boolean=false;
  constructor(private router: Router, public snackBar: MatSnackBar,
    private authService: AuthService) {
  }
  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  GPluslogin() {
    this.logging= true;
    this.authService.signInWithGoogle().then(
      (res) => {
        this.logging = false;
        this.router.navigate(['']);
      })
      .catch((err)=>{console.log(err)});
  }

  login() {
    this.logging = true;
    this.authService.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
      .then((res) => {
        this.loginForm.reset();
        this.logging = false;
        this.router.navigate(['']);
      })
      .catch((error) => {
        this.logging = false;
        this.snackBar.open(
          'Invalid Email or password!', '', {
          duration: 3000
        });
        this.loginForm.reset();
      });
  }



}

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
   processing:boolean=false;

  constructor(private authService: AuthService, private router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createSingupForm();
  }

  createSingupForm() {
    this.signupForm = new FormGroup({
      displayName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])

    });
  }

  signup() {
    if (this.signupForm.valid) {
      this.processing = true;
      console.log(this.signupForm.value);
      this.authService.createUser(this.signupForm.value.email, this.signupForm.value.password)
        .then(
          (user) => {
            if (user) {
              user.updateProfile({
                displayName: this.signupForm.value.displayName
              }).then(
                (s) => {
                  this.authService.updateUser(user);
                  this.signupForm.reset();
                  this.router.navigate(['']);
                }
              );
            }
          })
        .catch((error) => {
          this.processing =  false;
          this.signupForm.reset();
          this.snackBar.open(error.message, '', {
            duration: 3000
          });
        });
    }
  }



}

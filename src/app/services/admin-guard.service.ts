import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { AuthService } from './auth.service';
import * as _ from 'lodash';
@Injectable()
export class AdminGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user
                 .take(1)
                 .map(user => user.roles['admin'])
                 .do(authorized => {
                   console.log(authorized);
                   if (!authorized) {
                     console.log('route prevented!');
                    //  this.router.navigate(['/']);
                   }
                 });

  }
}

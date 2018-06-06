import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../components/auth/login/login.component";
import { SignupComponent } from "../components/auth/signup/signup.component";
import { DashboardComponent } from "../components/dashboard/dashboard.component";
import { OnlyLoggedInUsersGuardService } from "../services/only-logged-in-users-guard.service";
import { Profile } from "selenium-webdriver/firefox";
import { ProfileComponent } from "../components/profile/profile.component";
import { BookDetailComponent } from "../components/book-detail/book-detail.component";
import { AdminGuardService } from "../services/admin-guard.service";
import { AddBookComponent } from "../components/admin/add-book/add-book.component";

const routes: Routes = [
  {
    path: "auth/login",
    component: LoginComponent
  },
  {
    path: "auth/sign-up",
    component: SignupComponent
  },
  {
    path: "profile",
    canActivate: [OnlyLoggedInUsersGuardService],
    component: ProfileComponent
  },
  {
    path: 'book/:id',
    component: BookDetailComponent
  },
  {
    path: 'admin',
    canActivate: [],
    component: AddBookComponent
  },
  {
    path: '',
    canActivate: [OnlyLoggedInUsersGuardService],
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}

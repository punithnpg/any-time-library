import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppRoutingModule } from './modules/routing.module';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { OnlyLoggedInUsersGuardService } from './services/only-logged-in-users-guard.service';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BooksService } from './services/books.service';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { SearchComponent } from './components/search/search.component';
import { AddBookComponent } from './components/admin/add-book/add-book.component';
import { AdminGuardService } from './services/admin-guard.service';
import { AuthorComponent } from './components/admin/author/author.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    HeaderComponent,
    ProfileComponent,
    BookDetailComponent,
    SearchComponent,
    AddBookComponent,
    AuthorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase,'project-798348645614'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : []
  ],
  providers: [AuthService, OnlyLoggedInUsersGuardService, BooksService, AdminGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

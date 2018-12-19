import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { JwtInterceptor } from './JwtInterceptor';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { AuthService } from './AuthService';
import { AuthGuard } from './auth.guard';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { UsersComponent } from './users/users.component';
import { Globals } from './globals';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './book/book.component'

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegistrationComponent,
        NavComponent,
        HomeComponent,
        OrdersComponent,
        ProfileComponent,
        CartComponent,
        AdminNavComponent,
        UserProfileComponent,
        AdminProfileComponent,
        UsersComponent,
        BooksComponent,
        BookComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxPaginationModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        DatePipe,
        CartComponent,
        AuthService,
        Globals
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

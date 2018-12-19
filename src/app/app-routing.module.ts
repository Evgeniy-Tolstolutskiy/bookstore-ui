import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { OrdersComponent } from './orders/orders.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './auth.guard';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { UsersComponent } from './users/users.component';
import { BooksComponent } from './books/books.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_USER' } },
    { path: 'registration', component: RegistrationComponent },
    { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_USER' } },
    { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_USER' } },
    { path: 'cart', component: CartComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_USER' } },
    { path: 'adminHome', component: AdminProfileComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_ADMIN' } },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_ADMIN' } },
    { path: 'books', component: BooksComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_ADMIN' } }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

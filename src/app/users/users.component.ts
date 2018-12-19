import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    private users: User[] = [];

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit() {
        this.http.get<User[]>(`${config.apiUrl}/users`).pipe(first()).subscribe(users => {
            this.users = (<any>users)._embedded.users;
        });
    }

    remove(id: number): void {
        this.http.delete(`${config.apiUrl}/users/${id}`).pipe(first()).subscribe(response => {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(["/users"], {}));
        });
    }
}

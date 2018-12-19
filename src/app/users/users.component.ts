import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Globals } from '../globals'
import { Page } from '../_models/page';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    users: User[] = [];
    page: Page;

    constructor(private http: HttpClient, private router: Router, private globals: Globals) { }

    ngOnInit() {
        this.loadAllUsers(0, this.globals.defaultPageSize);
    }

    private loadAllUsers(pageNumber: number, size: number) {
        this.http.get<User[]>(`${config.apiUrl}/usersRepository?page=${pageNumber}&size=${size}`).pipe(first()).subscribe(users => {
            this.users = (<any>users)._embedded.users;
            this.page = (<any>users).page;
            this.page.number += 1;
        });
    }

    remove(id: number): void {
        this.http.delete(`${config.apiUrl}/usersRepository/${id}`).pipe(first()).subscribe(response => {
            this.loadAllUsers(this.page.number - 1, this.globals.defaultPageSize);
        });
    }

    pageChanged(pageNumber: number) {
        this.loadAllUsers(pageNumber - 1, this.globals.defaultPageSize);
    }
}

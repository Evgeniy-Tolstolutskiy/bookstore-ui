import { Component, OnInit } from '@angular/core';
import { Book } from '../_models/book';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { Page } from '../_models/page';
import { Globals } from '../globals'

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
    books: Book[] = [];
    page: Page;

    constructor(private http: HttpClient, private globals: Globals) { }

    ngOnInit() {
        this.loadAllBooks(0, this.globals.defaultPageSize);
    }

    private loadAllBooks(pageNumber: number, size: number) {
        this.http.get<Book[]>(`${config.apiUrl}/books?page=${pageNumber}&size=${size}`).pipe(first()).subscribe(books => {
            this.books = (<any>books)._embedded.books;
            this.page = (<any>books).page;
            this.page.number += 1;
        });
    }

    pageChanged(pageNumber: number) {
        this.loadAllBooks(pageNumber - 1, this.globals.defaultPageSize);
    }

    edit(book: Book) {
        this.loadAllBooks(this.page.number - 1, this.globals.defaultPageSize);
    }
}

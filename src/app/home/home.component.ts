import { Component, OnInit } from '@angular/core';
import { Book } from '../_models/book';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { CartComponent } from '../cart/cart.component';
import { Page } from '../_models/page';
import { Globals } from '../globals'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    books: Book[] = [];
    page: Page;

    constructor(private http: HttpClient, private cartComponent: CartComponent, private globals: Globals) { }

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

    addToCart(book: Book) {
        if (book.count > 0) {
            book.count -= 1;
            this.cartComponent.add(book);
        }
    }

    isCountExceeded(book: Book) {
        return book.count <= 0;
    }

    pageChanged(pageNumber: number) {
        this.loadAllBooks(pageNumber - 1, this.globals.defaultPageSize);
    }
}

import { Component, OnInit } from '@angular/core';
import { Book } from '../_models/book';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { CartComponent } from '../cart/cart.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    books: Book[] = [];

    constructor(private http: HttpClient, private cartComponent: CartComponent) { }

    ngOnInit() {
        this.loadAllBooks();
    }

    private loadAllBooks() {
        this.http.get<Book[]>(`${config.apiUrl}/books`).pipe(first()).subscribe(books => {
            this.books = (<any>books)._embedded.books;
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
}

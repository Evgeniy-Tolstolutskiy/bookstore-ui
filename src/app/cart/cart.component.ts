import { Component, OnInit } from '@angular/core';
import { Book } from '../_models/book';
import { BookOrder } from '../_models/book-order';
import { Order } from '../_models/order';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
@Injectable()
export class CartComponent implements OnInit {
    private books: Book[] = [];
    private total: number = 0;

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit() {
        this.loadCart();
    }

    loadCart(): void {
        this.total = 0;
        this.books = [];
        let books = JSON.parse(localStorage.getItem('cart'));
        for (var i = 0; i < books.length; i++) {
            this.books.push(books[i]);
            this.total += books[i].price * books[i].count;
        }
    }

      add(book: Book) {
          const copiedBook: Book = { ...book };
          let books: any = JSON.parse(localStorage.getItem('cart'));
          if (books == null) {
              books = [];
          }
          for (var i = 0; i < books.length; i++) {
              if (books[i].id == book.id) {
                  books[i].count += 1;
                  localStorage.setItem("cart", JSON.stringify(books));
                  return;
              }
          }
          copiedBook.count = 1;
          books.push(copiedBook);
          localStorage.setItem("cart", JSON.stringify(books));
      }

    remove(id: number): void {
        let books: any = JSON.parse(localStorage.getItem('cart'));
        for (var i = 0; i < books.length; i++) {
            if (books[i].id == id) {
                books.splice(i, 1);
                break;
            }
        }
        localStorage.setItem("cart", JSON.stringify(books));
        this.loadCart();
    }

    makeOrder() {
        let orderItems: BookOrder[] = [];
        for (var i = 0; i < this.books.length; i++) {
            orderItems.push({
                book: this.books[i],
                count: this.books[i].count
            });
		    }
        let order: Order = new Order();
        order.bookOrders = orderItems;
        order.price = this.total;
        this.books = [];
        localStorage.setItem("cart", JSON.stringify(this.books));
        return this.http.post<any>(`${config.apiUrl}/orders`, order)
            .pipe(first())
                .subscribe(
                    data => {
                        this.router.navigate(['/orders']);
                    });
    }
}

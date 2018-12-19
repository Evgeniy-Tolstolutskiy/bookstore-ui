import { Component, OnInit } from '@angular/core';
import { Order } from '../_models/order';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { Globals } from '../globals'
import { Page } from '../_models/page';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
    orders: Order[] = [];
    page: Page;

    constructor(private http: HttpClient, private globals: Globals) { }

    ngOnInit() {
        this.loadAllOrders(0, this.globals.defaultPageSize);
    }

    private loadAllOrders(pageNumber: number, size: number) {
        this.http.get<Order[]>(`${config.apiUrl}/orders/my?page=${pageNumber}&size=${size}`).pipe(first()).subscribe(orders => {
            this.orders = (<any>orders).content;
            this.page = {
                number: (<any>orders).number + 1,
                size: (<any>orders).size,
                totalElements: (<any>orders).totalElements
            };
        });
    }

    pageChanged(pageNumber: number) {
        this.loadAllOrders(pageNumber - 1, this.globals.defaultPageSize);
    }
}

import { Component, OnInit } from '@angular/core';
import { Order } from '../_models/order';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
    orders: Order[] = [];

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.loadAllOrders();
    }

    private loadAllOrders() {
        this.http.get<Order[]>(`${config.apiUrl}/orders/my`).pipe(first()).subscribe(orders => {
            this.orders = orders;
        });
    }
}

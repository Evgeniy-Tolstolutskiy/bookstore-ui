import { BookOrder } from './book-order';

export class Order {
    id: number;
    bookOrders: BookOrder[];
    price: number;
    date: Date;
}

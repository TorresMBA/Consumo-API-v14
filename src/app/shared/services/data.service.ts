import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DetailsOrder, Order } from "../interface/order.interface";
import { Store } from "../interface/store.interface";

@Injectable({
    providedIn: "root"
})

export class DataService {
    private apiUrl = "http://localhost:3000";

    constructor(private http: HttpClient) { }

    getStores():Observable<Store[]>{
        return this.http.get<Store[]>(this.apiUrl + "/stores");
    }

    saveOrder(order: Order): Observable<any> {
        return this.http.post<Order>(this.apiUrl + "/orders", order);
    }

    saveDetailsOrder(details: DetailsOrder): Observable<any> {
        return this.http.post<DetailsOrder>(this.apiUrl + "/detailsOrders", details);
    }
}
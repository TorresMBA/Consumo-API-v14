import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Product } from "src/app/pages/products/interface/product.interface";

@Injectable({
    providedIn: "root"
})

export class ShoppingCartService {
    private products: Product[] = [];

    private cartSubject = new Subject<Product[]>();
    private totalSubject = new Subject<number>();
    private quantitySubject = new Subject<number>();

    get cartAction$(): Observable<Product[]> {
        return this.cartSubject.asObservable();
    }

    get totalAction$(): Observable<number> {
        return this.totalSubject.asObservable();
    }

    get quantityAction$(): Observable<number> {
        return this.quantitySubject.asObservable();
    }

    private addToCart(product: Product): void {
        this.products.push(product);
        this.cartSubject.next(this.products);
    }

    private quantityProducs(): void {
        const quantity = this.products.length;
        this.quantitySubject.next(quantity);
    }

    private calculateTotal(): void {
        const total = this.products.reduce((sum, product) => sum += product.price, 0);
        this.totalSubject.next(total);   
    }

    updateCart(product: Product): void {
        this.addToCart(product);
        this.quantityProducs();
        this.calculateTotal();    
    }
}
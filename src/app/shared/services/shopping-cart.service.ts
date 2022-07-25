import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "src/app/pages/products/interface/product.interface";

@Injectable({
    providedIn: "root"
})

export class ShoppingCartService {
    private products: Product[] = [];

    private cartSubject = new BehaviorSubject<Product[]>([]);
    private totalSubject = new BehaviorSubject<number>(0);
    private quantitySubject = new BehaviorSubject<number>(0);

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
        const isProductinCart = this.products.find(({id}) => id === product.id);

        if (isProductinCart) {
            isProductinCart.quantity += 1;    
        }else{
            this.products.push({...product, quantity: 1});
        }
        this.cartSubject.next(this.products);
    }

    private quantityProducs(): void {
        const quantity = this.products.reduce((sum, product) => sum += product.quantity, 0);
        this.quantitySubject.next(quantity);
    }

    private calculateTotal(): void {
        const total = this.products.reduce((sum, product) => sum += (product.price *  product.quantity), 0);
        this.totalSubject.next(total);   
    }

    updateCart(product: Product): void {
        this.addToCart(product);
        this.quantityProducs();
        this.calculateTotal();    
    }

    resetShoppingCart(): void {
        this.cartSubject.next(this.products);
        this.quantitySubject.next(0);
        this.totalSubject.next(0);
        this.products = [];
    }
}
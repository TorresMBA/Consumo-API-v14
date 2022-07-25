import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { delay, switchMap, tap } from 'rxjs';
import { Store } from 'src/app/shared/interface/store.interface';
import { DataService } from 'src/app/shared/services/data.service';
import { Details } from 'src/app/shared/interface/order.interface';
import { Product } from '../products/interface/product.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Router } from '@angular/router';
import { ProductsService } from '../products/services/products.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
    model = {
        name: '',
        store: '',
        shippingAddress: '',
        city: ''
    };
    isDelivery : boolean = true;
    cart: Product[] = [];
    stores: Store[] = [];
    constructor(private dataService: DataService, 
        private shoppingCartService: ShoppingCartService,
        private productService: ProductsService,
        private router: Router) {
        this.checkIfCartIsEmpty();
    }

    ngOnInit(): void {
        this.getStore();
        this.getDataCart();
        this.prepareDetails();
    }
    
    onPickupOrDelivery(value: boolean): void {
        this.isDelivery = value;
    }

    onSubmit({ value: formData }:NgForm): void {
        const data = {
            ...formData,
            date: this.getCurrentDay(),
            isDelivery: this.isDelivery
        }

        this.dataService.saveOrder(data)
        .pipe(
            tap((response: any) => console.log('Order -> ', response)),
            switchMap( ({id: orderId}) => {
                const details = this.prepareDetails();
                return this.dataService.saveDetailsOrder({ details, orderId });
            }),
            tap(() => this.router.navigate(['/checkout/order-success'])),
            delay(2000),
            tap(() => this.shoppingCartService.resetShoppingCart())
        )
        .subscribe();
    }

    private getStore(): void {
        this.dataService.getStores()
        .pipe(
            tap((response: Store[]) => this.stores = response)
        )
        .subscribe();
    }

    private getCurrentDay(): string {
        return new Date().toLocaleDateString();
    }

    private prepareDetails(): Details[]{
        const details: Details[] = [];
        this.cart.forEach(product =>{
            const { id:productId, name:productName, quantity, stock } = product;
            const updateStock = stock - quantity;

            this.productService.updateStock(productId, updateStock)
            .pipe(
                tap(() => details.push({productId, productName, quantity}))
            )
            .subscribe();
        });
        return details;
    }

    private getDataCart(): void {
        this.shoppingCartService.cartAction$
        .pipe(
            tap((response: Product[]) => this.cart = response)
        )
        .subscribe();
    }

    private checkIfCartIsEmpty(): void {
        this.shoppingCartService.cartAction$
        .pipe(
            tap((product: Product[]) => {
                if(Array.isArray(product) && product.length === 0) {
                    this.router.navigate(['/products']);
                }
            })
        )
        .subscribe();
    }
}

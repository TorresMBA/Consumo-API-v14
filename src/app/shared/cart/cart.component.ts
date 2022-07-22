import { Component } from "@angular/core";
import { ShoppingCartService } from "../services/shopping-cart.service";


@Component({
    selector: "app-cart",
    template: `
    <ng-container *ngIf="{ total : total$ | async, quantity: quantity$ | async } as dataCart">
        <ng-container *ngIf="dataCart.total">
            <mat-icon>add_shopping_cart</mat-icon>
            {{ dataCart.total | currency }}
            ({{ dataCart.quantity}})
        </ng-container>
    </ng-container>`,
    styles: []
})

export class CartComponent {
    quantity$ = this.shopingCartService.quantityAction$;
    cart$ = this.shopingCartService.cartAction$;
    total$ = this.shopingCartService.totalAction$;

    constructor(private shopingCartService: ShoppingCartService) {}
}
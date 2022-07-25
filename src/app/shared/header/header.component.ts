import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    template: `
    <mat-toolbar color="primary">
        <a [routerLink]="['/']">
            <span>My Store</span>
        </a>
        <span class="spacer"></span>
        <app-cart class="mouseOver" (click)="goToCheckOut()"></app-cart>
    </mat-toolbar>`,
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

    constructor(private router: Router) { }

    goToCheckOut() {
        this.router.navigate(['/checkout']);
    }
}

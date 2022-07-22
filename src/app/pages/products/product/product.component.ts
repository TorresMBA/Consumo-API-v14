import { Component, EventEmitter, Input, OnInit, Output,ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../interface/product.interface';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],

    /**ChangeDetectionStrategy
     * Es e mecanismo de estrategia de deteccion de cambios que utiliza angular 
     * para saber cuando actualizar un componente o toda la vista en caso se 
     * haya cambiado toda la data
     * 
     * Estrategias:
     * OnPush: Se actualiza solo el componente que se esta modificando, estrategia CheckOnce    
     * Default: Se actualiza toda la vista, es decir, todos los componentes, estrategia CheckAlways
    */
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
    @Input() product!: Product;
    @Output() addToCartClick = new EventEmitter<Product>();

    onClick(): void {
        console.log('clicked', this.product);
        this.addToCartClick.emit(this.product);
    }
}

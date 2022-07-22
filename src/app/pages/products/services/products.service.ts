import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interface/product.interface';

@Injectable({
    providedIn: 'root', //Indica que este service esta disponible para toda la aplicaicón - Inyeccion de dependencias
})
export class ProductsService {
    private apiUrl = 'http://localhost:3000/products';

    constructor(private http: HttpClient) { }
    
    //Observable<tipo> -> Es gracias a rxjs y no es mas que un flujo de datos en el tiempo
    //Los observables representan una colección de futuros valores o data
    //Parecido a Promises -> como React o Js Vanilla
    getProducts(): Observable<any> {
        return this.http.get<Product[]>(this.apiUrl);
    }
}

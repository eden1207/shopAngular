import { Injectable } from '@angular/core';
import { Product } from '../domain/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
/**
 * Service to manage the different end points of the application
 * 
 * The injectable indicate that the service is used in the root of the application
 * 
 * There are four end points associated to GET/POST/PUT/DELETE methods
 */
@Injectable({
    providedIn: 'root'
})
export class ProductService {


    constructor(private http: HttpClient) {}

	getAllProducts(): Observable<Product[]> {
		return this.http.get<Product[]>('http://localhost:3000/api/products');
	}

	createNewProduct(
	        formValue: {
			    id?: number, 
			    code?: string, 
			    name?: string, 
			    description?: string, 
				price?: number, 
				quantity?: number,
                inventoryStatus?: string,
			    categorie?: string, 
				image?: string,
                rating?: number
		    }
		): Observable<Product> {
		return this.http.post<Product>('http://localhost:3000/api/products', formValue);
	}

	modifyProduct(
		formValue: {
			id?: number, 
			code?: string, 
			name?: string, 
			description?: string, 
			price?: number, 
			quantity?: number,
			inventoryStatus?: string,
			categorie?: string, 
			image?: string,
			rating?: number
		}
	): Observable<Product> {
	return this.http.put<Product>(`http://localhost:3000/api/products/${formValue.id}`, formValue);
    }

	deleteProduct(
		formValue: {
			id?: number, 
			code?: string, 
			name?: string, 
			description?: string, 
			price?: number, 
			quantity?: number,
			inventoryStatus?: string,
			categorie?: string, 
			image?: string,
			rating?: number
		}
	): Observable<Product> {
	return this.http.delete<Product>(`http://localhost:3000/api/products/${formValue.id}`);
    }

};

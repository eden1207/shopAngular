import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';
import { SortEvent } from 'primeng/api';

/**
 * Component to display the admin-products page
 */
@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss']
})
export class ProductsAdminComponent implements OnInit {

  /** 
   * products: array containing all the products data 
   * selectedProducts: array containing all the products we select thanks to the check boxes
   * productService: service used to manage the data thanks to different method (GET, POST, etc) 
   */
  products!: Product[];

  selectedProducts!: Product;

  constructor(private productService: ProductService) {}

  ngOnInit(): void{
    this.products = this.productService.getAllProducts();
  }

  /**
   * Function to generate two types of class to display alternate colors of
   * gray and white rows for each products of the table
   * @param {number} index 
   * @returns {Object}
   */
  getRowClass(index: number): object {
    const backgroundColor = index % 2 === 0 ? '#ffffff' : '#d6d6d6';
    return { 'background-color': backgroundColor };
  }

  /**
   * Function from PrimNG labrary to sort the elements of each column
   * @param event 
   */
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

        return event.order * result;
    });
  }

}

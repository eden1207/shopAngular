import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Component to display the products page
 */
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  /** 
   * products: observable containing an array with all the products data 
   * filteredProducts: observable containing an array with all the products filtered by the searchBar
   * productService: service used to manage the data thanks to different method (GET, POST, etc) 
   * sortOptions: provides the list of sort options when you click on "Sort by" button
   * sortOrder: to decide if you want to sort from 'A-Z' order or 'Z-A' for example
   * sortField: to decide the name of the sort category
   */

  products$!: Observable<Product[]>;

  filteredProducts$!: Observable<Product[]>;

  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;

  constructor(private productService: ProductService) { }

  ngOnInit(): void{
    this.products$ = this.productService.getAllProducts();

    this.filteredProducts$ = this.products$;

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];
  }

  /**
   * Function to sort the array element as function of
   * the sortOptions
   */
  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) { //indexOf take the index of '!' => 0 for the string '!pride'
        this.sortOrder = -1;
        //substring keep the string element from index 1 to length => here, to keep 'pride'
        this.sortField = value.substring(1, value.length); 
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }

  /**
   * Function associate to the searchBar
   * When we write something, the function take the array of the observable products$
   * thanks to map function to use the classical filter method
   */
  onSearch(event: any) {
    const searchText = (event.target as HTMLInputElement).value;
    if (searchText) {
      this.filteredProducts$ = this.products$.pipe(
        map (products =>
          products.filter(product =>
            product.name.toLowerCase().includes(searchText.toLowerCase()) ||
            product.description.toLowerCase().includes(searchText.toLowerCase())
          )
        )
      );
    } else {
      this.filteredProducts$ = this.products$;
    }
  }

  /**
   * Function from PrimeNG providing the avalaibility of a product
   * @param product 
   * @returns {string}
   */
  getSeverity (product: Product) {
    switch (product.inventoryStatus) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
  };
}

import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';
import { SelectItem } from 'primeng/api';

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
   * products: array containing all the products data 
   * filteredProducts: array containing all the products filtered by the searchBar
   * productService: service used to manage the data thanks to different method (GET, POST, etc) 
   * sortOptions: provides the list of sort options when you click on "Sort by" button
   * sortOrder: to decide if you want to sort from 'A-Z' order or 'Z-A' for example
   * sortField: to decide the name of the sort category
   */
  products!: Product[];

  filteredProducts!: Product[];

  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;

  constructor(private productService: ProductService) { }

  ngOnInit(): void{
    this.products = this.productService.getAllProducts();

    this.filteredProducts = this.products;

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];
  }

  // A commenter (Or PrimeNG)
  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }

  // Bien commenter le as HTMLInputElement et le filter (voir comment faire différemment)
  onSearch(event: any) {
    const searchText = (event.target as HTMLInputElement).value;
    if (searchText) {
      this.filteredProducts = this.products.filter(product =>
          product.name.toLowerCase().includes(searchText.toLowerCase()) ||
          product.description.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
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

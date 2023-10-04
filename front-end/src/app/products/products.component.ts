import { Component, OnInit } from '@angular/core';
//import { DataViewLayoutOptions } from 'primeng/dataview';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products!: Product[];

  /*layoutOptions!: DataViewLayoutOptions;*/
  /*layout: string = 'grid';*/

  constructor(private productService: ProductService) { 
    /*this.layoutOptions = {
      grid: true,
    };*/
  }

  /*ngOnInit() {
      this.productService.getProducts().then((data) => (this.products = data.slice(0, 5)));
  }*/

  ngOnInit(): void{
    this.products = this.productService.products;
  }

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

import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss']
})
export class ProductsAdminComponent implements OnInit {

  products!: Product[];

  selectedProducts!: Product;

  constructor(private productService: ProductService) {}

  ngOnInit(): void{
    this.products = this.productService.products;
  }

}
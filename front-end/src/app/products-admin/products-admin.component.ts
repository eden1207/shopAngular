import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';
import { SortEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmationService, MessageService } from 'primeng/api';

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
   * products$: containing an array with all the products data 
   * product: object used for the POST, PUT and DELETE method
   * productDialog: used to open/close a form in order to create/edit a product
   * selectedProducts: array containing all the products we select thanks to the check boxes
   * submitted: used to submit the form
   * statuses: provides the status of a product (not working on the form)
   * mode: used during the form submission in order to choose the POST/PUT method
   * productService: service used to manage the data thanks to different method (GET, POST, etc)
   * confirmationService: provides a message to confirm we want to delete a product 
   * messageService: provides a message to confirm that the product is deleted
   */
  products$!: Observable<Product[]>;

  product!: Product;

  productDialog: boolean = false;

  selectedProducts!: Product[] | null;

  submitted: boolean = false;

  statuses!: any[];

  mode: string = 'new';

  constructor(
    private confirmationService: ConfirmationService, 
    private messageService: MessageService, 
    private productService: ProductService
  ) {}

  ngOnInit(): void{
    this.products$ = this.productService.getAllProducts();

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
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

  /** Function from PrimeNG to open a form */
  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
    this.mode = 'new';
  }

  /**Function to delete selected products. The delete process is not working so far */
  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.products$ = this.products$.pipe(
            map(products =>
              products.filter((val) => !this.selectedProducts?.includes(val))
          ));
          this.selectedProducts = null;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }

  /** 
   * Function from PrimeNG to edit a product
   * I add this.mode to choose a PUT method during form submission 
   */
  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
    this.mode = 'edit';
  }

  /** Function to delete, inspired from PrimeNG website */
  deleteProduct(product: Product) {
    /** Display a message to confirm you want to delete */
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + product.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            /** Delete the product from the back-end */
            this.productService.deleteProduct(product)
            .subscribe(
              (response) => {
                console.log(response);
                this.productDialog = false;
              },
              (error) => {
                console.error(error);
              }
            );
            /** Delete the product from the array */
            this.products$ = this.products$.pipe(
              map(products =>
                products.filter((val) => val.id !== product.id))
            );
            this.product = {};
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        }
    });
  }

  /** Function to hide the form */
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  /** Function to create a new product */
  saveProduct() {
    this.submitted = true;
    if(this.mode === 'new') {
      /** You need to enter a name */
      if (this.product.name?.trim()) {
        this.product.id = this.createId();
        this.product.code = this.createCode();
        this.product.image = '';
        this.product.rating = null;
        this.product.inventoryStatus = 'INSTOCK'; /** I fixed the value because the input does not work so far */
        this.productService.createNewProduct(this.product)
        .subscribe(
          (response) => {
            console.log(response);
            this.productDialog = false;
          },
          (error) => {
            console.error(error);
          }
        );
      }
    }

    if(this.mode === 'edit') {
      this.productService.modifyProduct(this.product)
      .subscribe(
        (response) => {
          console.log(response);
          this.productDialog = false;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  /** Two function to create random ids and codes */
  createId(): number {
    let id = '';
    const chars = '0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return Number(id);
  }

  createCode(): string {
    let code = '';
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 9; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  /** Function PrimeNG */
  /*getSeverity(status: string): string {
    switch (status) {
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warning';
        case 'OUTOFSTOCK':
            return 'danger';
    }
  }*/

}

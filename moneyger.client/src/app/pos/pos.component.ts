import { Component, OnInit, inject } from '@angular/core';
import { UserCompanyDetail } from '../interfaces/user-company-detail';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { InventoryRequest } from '../interfaces/inventory-request';
import { ValidationError } from '../interfaces/validation-error';
import { SalesService } from '../shared/sales.service';
import { SalesRequest } from '../interfaces/sales-request';
import { HttpErrorResponse } from '@angular/common/http';
import { InventoryService } from '../shared/inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css'],
})
export class PosComponent implements OnInit{
  userDetail! :Observable<UserCompanyDetail>;
  errors: ValidationError[] = [];
  constructor(
    private salesService: SalesService,
    private inventoryService: InventoryService
  ){}

  sales: SalesRequest[] = [];
  salemaker: SalesRequest = {
    date: '',
    profit:0,
    expenses: 0,
    revenue: 0
  };
  
  ngOnInit(): void {
    this.userDetail = this.authService.getUserCompany();
    this.getSales();
    this.getInventory();
  }

  authService = inject(AuthService);
  router = inject(Router);
  
  displayedColumns: string[] = ['id', 'name', 'quantity', 'price'];
  displayedColumns_cart: string[] = ['name', 'quantity', 'price', 'actions'];
  dataSource_prod: InventoryRequest[] = [];//<---------------PANG-ILISI NIG TARONG, USE getInventory()
  dataSource_cart: InventoryRequest[] = [];
  
  selectedProduct: InventoryRequest | null = null;
  inputQuantity: number = 0;
  expendetureValue: number = 0;

  logout=()=>{
    this.authService.logout();
    this.router.navigate(['/login']);
  };

  getInventory(): void {
    this.inventoryService.getInventory().subscribe({
      next: (response: InventoryRequest[]) => {
        this.dataSource_prod = response;
       console.log(this.dataSource_prod);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.errors = err.error;
        }
        console.error(err.message);
      },
    });
  }

  selectProduct(product: InventoryRequest) {
    this.selectedProduct = product;
    this.inputQuantity = 0;
  }
  
  getTotalPrice(): number { //mao ni ang total price
    let totalPrice = 0;
    for (const item of this.dataSource_cart) {
      totalPrice += item.quantity * item.price;
    }
    return totalPrice;
  }

  getTotalQuantity(): number {
    let totalQuantity = 0;
    for (const item of this.dataSource_cart) {
      totalQuantity += item.quantity;
    }
    return totalQuantity;
  }

  addToCart() {
    if (this.selectedProduct && this.inputQuantity > 0 && this.inputQuantity <= this.selectedProduct.quantity) {
      this.selectedProduct.quantity -= this.inputQuantity;
  
      const cartItemIndex = this.dataSource_cart.findIndex(item => item.product === this.selectedProduct!.product);
      if (cartItemIndex !== -1) {
        this.dataSource_cart[cartItemIndex].quantity += this.inputQuantity;
      } else {
        this.dataSource_cart.push({
          id: this.selectedProduct.id,
          product: this.selectedProduct.product,
          quantity: this.inputQuantity,
          price: this.selectedProduct.price
        });
      }
      // Reset inputQuantity after adding to cart
      this.inputQuantity = 0;
  
      // Trigger change detection to update the view
      this.dataSource_cart = [...this.dataSource_cart];
    }
  }

  deleteFromCart(name: string) {
    const index = this.dataSource_cart.findIndex(item => item.product === name);
    if (index !== -1) {
      const deletedItem = this.dataSource_cart.splice(index, 1)[0]; // Remove item from cart
      const product = this.dataSource_prod.find(item => item.product === deletedItem.product);
      if (product) {
        product.quantity += deletedItem.quantity; // Add quantity back to product table
      }
    }
    this.dataSource_cart = this.dataSource_cart.filter(item => item.product !== name);
  }

  cancelOrder() {
    this.dataSource_cart.forEach(cartItem => {
      const productIndex = this.dataSource_prod.findIndex(product => product.product === cartItem.product);
      if (productIndex !== -1) {
        this.dataSource_prod[productIndex].quantity += cartItem.quantity;
      }
    });
    this.dataSource_cart = [];
  }

  addSale() {
    this.salemaker.revenue = this.getTotalPrice();
    this.salesService.addSale(this.salemaker).subscribe({
      next: (response) => {
        this.salesService.manageSales(this.dataSource_prod).subscribe({
          next:(response) =>{
            console.log(this.dataSource_cart);
          },
          error: (err: HttpErrorResponse) => {
            if (err.status === 400) {
              this.errors = err.error;
            }
            console.error(err.message);
          },
          complete: () => this.dataSource_cart=[]
        });
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.errors = err.error;
        }
        console.error(err.message);
      },
      complete: () => this.salemaker.revenue=0,
    });
  }

  addExpense() {
    this.salemaker.expenses = this.expendetureValue;
    this.salesService.addSale(this.salemaker).subscribe({
      next: (response) => {
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.errors = err.error;
        }
        console.error(err.message);
      },
      complete: () => {
       this.expendetureValue = 0,
       this.salemaker.expenses = 0
      }
    });
  }

  getSales(): void {
    this.salesService.getSales().subscribe({
      next: (response: SalesRequest[]) => {
        this.sales = response;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.errors = err.error;
        }
        console.error(err.message);
      },
    });
  }
}

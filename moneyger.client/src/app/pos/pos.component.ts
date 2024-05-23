import { Component, OnInit, inject } from '@angular/core';
import { CartItem } from '../interfaces/cart-item';
import { UserCompanyDetail } from '../interfaces/user-company-detail';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { InventoryRequest } from '../interfaces/inventory-request';
import { ValidationError } from '../interfaces/validation-error';
import { SalesService } from '../shared/sales.service';
import { SalesRequest } from '../interfaces/sales-request';
import { HttpErrorResponse } from '@angular/common/http';

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
  ){}

  salemaker: SalesRequest = {
    expenses: 0,
    revenue: 0
  };
  
  ngOnInit(): void {
    this.userDetail = this.authService.getUserCompany();
  }

  authService = inject(AuthService);
  
  displayedColumns: string[] = ['id', 'name', 'quantity', 'price'];
  displayedColumns_cart: string[] = ['name', 'quantity', 'price', 'actions'];
  dataSource_prod: InventoryRequest[] = [
    /*{ quantity: 14, name: 'Laptop', id: 12346, price: 12000 },
    { quantity: 32, name: 'Cellphone', id: 12347, price: 10000 },
    { quantity: 41, name: 'Speaker', id: 12348, price: 1200 },
    { quantity: 53, name: 'Mouse', id: 12349, price: 1500 },
    { quantity: 36, name: 'Headset', id: 12350, price: 1000 },
    { quantity: 18, name: 'Keyboard', id: 12351, price: 5600 },
    { quantity: 21, name: 'Monitor', id: 12352, price: 4800 },*///<---------------PANG-ILISI NIG TARONG, USE getInventory()
  ];
  dataSource_cart: CartItem[] = [
    { quantity: 14, name: 'Laptop', price: 12000 },
  ];
  
  selectedProduct: InventoryRequest | null = null;
  inputQuantity: number = 0;
  expendetureValue: number = 0;


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
  
      const cartItemIndex = this.dataSource_cart.findIndex(item => item.name === this.selectedProduct!.name);
      if (cartItemIndex !== -1) {
        this.dataSource_cart[cartItemIndex].quantity += this.inputQuantity;
      } else {
        this.dataSource_cart.push({
          name: this.selectedProduct.name,
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
    const index = this.dataSource_cart.findIndex(item => item.name === name);
    if (index !== -1) {
      const deletedItem = this.dataSource_cart.splice(index, 1)[0]; // Remove item from cart
      const product = this.dataSource_prod.find(item => item.name === deletedItem.name);
      if (product) {
        product.quantity += deletedItem.quantity; // Add quantity back to product table
      }
    }
    this.dataSource_cart = this.dataSource_cart.filter(item => item.name !== name);
  }
  cancelOrder() {
    this.dataSource_cart.forEach(cartItem => {
      const productIndex = this.dataSource_prod.findIndex(product => product.name === cartItem.name);
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
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.errors = err.error;
        }
        console.error(err.message);
      },
      complete: () => ('Sold'),
    });
    this.dataSource_cart = [];
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
      complete: () => ('Sold'),
    });
    this.expendetureValue = 0;
  }
}

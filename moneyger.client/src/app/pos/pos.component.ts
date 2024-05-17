import { Component } from '@angular/core';

export interface Product {
  name: string;
  quantity: number;
  price: number;
  id: string;
}

export interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css'],
})
export class PosComponent {
  displayedColumns: string[] = ['id', 'name', 'quantity', 'price'];
  displayedColumns_cart: string[] = ['name', 'quantity', 'price', 'actions'];
  dataSource_prod: Product[] = [
    { quantity: 14, name: 'Laptop', id: '12346', price: 12000 },
    { quantity: 32, name: 'Cellphone', id: '12347', price: 10000 },
    { quantity: 41, name: 'Speaker', id: '12348', price: 1200 },
    { quantity: 53, name: 'Mouse', id: '12349', price: 1500 },
    { quantity: 36, name: 'Headset', id: '12350', price: 1000 },
    { quantity: 18, name: 'Keyboard', id: '12351', price: 5600 },
    { quantity: 21, name: 'Monitor', id: '12352', price: 4800 },
  ];
  dataSource_cart: CartItem[] = [
    { quantity: 14, name: 'Laptop', price: 12000 },
  ];
  
  selectedProduct: Product | null = null;
  inputQuantity: number = 0;

  selectProduct(product: Product) {
    this.selectedProduct = product;
    this.inputQuantity = 0;
  }
  getTotalPrice(): number {
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
    // Iterate over each item in the cart table
    this.dataSource_cart.forEach(cartItem => {
      // Find the corresponding product in the product table
      const productIndex = this.dataSource_prod.findIndex(product => product.name === cartItem.name);
      if (productIndex !== -1) {
        // Increment the quantity of the corresponding product by the quantity in the cart
        this.dataSource_prod[productIndex].quantity += cartItem.quantity;
      }
    });
  
    // Clear the cart table
    this.dataSource_cart = [];
  }
}

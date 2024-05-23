
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { InventoryService } from '../../../../shared/inventory.service';
import { InventoryRequest } from '../../../../interfaces/inventory-request';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationError } from '../../../../interfaces/validation-error';
import { AuthResponse } from '../../../../interfaces/auth-response';
import { AddItemComponent } from '../add-item/add-item.component';
import { EditItemComponent } from '../edit-item/edit-item.component';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit{
  inventory!:InventoryRequest[];

  constructor(
    private titleService: Title,
    private inventoryService: InventoryService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
      this.getInventory();
  }

  sortingOrders: { [key: string]: 'asc' | 'desc' } = {
    id: 'asc',
    name: 'asc',
    quantity: 'asc',
    price: 'asc'
};

  errors: ValidationError[] = [];
  searchText = '';
  checkedItems: { [key: string]: boolean } = {};
  headerHovered: { [key: string]: boolean } = {};


  isAnyCheckboxChecked(): boolean {
    return Object.values(this.checkedItems).some(isChecked => isChecked);
  }

  onCheckboxChange(productId: number, item: any): void {
    this.checkedItems[productId] = item.target.checked;
  }

  addItem(){
    const dialogRef = this.dialog.open(AddItemComponent, { // Pass any data you want to the dialog component
    });

    dialogRef.componentInstance.addItem.subscribe(() => {
      this.getInventory(); // Refresh the contacts list when a new contact is added
    });
  }

  editItem(){
    const dialogRef = this.dialog.open(EditItemComponent);
  }

  getInventory(): void {
    this.inventoryService.getInventory().subscribe({
      next: (response: InventoryRequest[]) => {
        this.inventory = response;
       console.log(this.inventory);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.errors = err.error;
        }
        console.error(err.message);
      },
    });
  }

  deleteSelectedItems(): void {
    const itemsToDelete = Object.keys(this.checkedItems).filter(inventoryId => this.checkedItems[Number(inventoryId)]).map(inventoryId => Number(inventoryId));

    if (itemsToDelete.length > 0) {
      this.inventoryService.deleteItems(itemsToDelete).subscribe({
        next: (response: AuthResponse) => {
          if (response.isSuccess) {
            this.inventory = this.inventory.filter(inventory => !itemsToDelete.includes(inventory.id));
            this.checkedItems = {};
          } 
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error deleting items', err.message);
        },
        
      complete:()=>this.ngOnInit(),
      });
    }
  }

  toggleSort(field: keyof InventoryRequest) {
    const currentSortingOrder = this.sortingOrders[field];

  console.log(`Sorting by ${field} in ${currentSortingOrder} order`);

  if (currentSortingOrder === 'asc') {
    this.inventory.sort((a, b) => {
      if (typeof a[field] === 'string' && typeof b[field] === 'string') {
        console.log(`Comparing strings: ${a[field]} and ${b[field]}`);
        return (b[field] as string).localeCompare(a[field] as string);
      } else if (typeof a[field] === 'number' && typeof b[field] === 'number') {
        console.log(`Comparing numbers: ${a[field]} and ${b[field]}`);
        return (b[field] as number) - (a[field] as number);
      } else {
        return 0;
      }
    });
    this.sortingOrders[field] = 'desc';
  } else {
    this.inventory.sort((a, b) => {
      if (typeof a[field] === 'string' && typeof b[field] === 'string') {
        console.log(`Comparing strings: ${a[field]} and ${b[field]}`);
        return (a[field] as string).localeCompare(b[field] as string);
      } else if (typeof a[field] === 'number' && typeof b[field] === 'number') {
        console.log(`Comparing numbers: ${a[field]} and ${b[field]}`);
        return (a[field] as number) - (b[field] as number);
      } else {
        return 0;
      }
    });
    this.sortingOrders[field] = 'asc';
  }

  console.log('Sorted inventory:', this.inventory);
  }

  showSortingIndicator(field: keyof InventoryRequest) {
    this.headerHovered[field] = true;
  }

  hideSortingIndicator(field: keyof InventoryRequest) {
    this.headerHovered[field] = false;
  }

  isHeaderHovered(field: keyof InventoryRequest) {
    return this.headerHovered[field];
  }

}

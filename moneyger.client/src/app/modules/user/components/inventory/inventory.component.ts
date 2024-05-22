
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  errors: ValidationError[] = [];
  searchText = '';
  checkedItems: { [key: string]: boolean } = {};

  constructor(
    public dialog: MatDialog,
  ){}

  isAnyCheckboxChecked(): boolean {
    console.log(this.checkedItems);
    return Object.values(this.checkedItems).some(isChecked => isChecked);
  }

  onCheckboxChange(productId: number, item: any): void {
    this.checkedItems[productId] = item.target.checked;
  }

  addItem(){
    const dialogRef = this.dialog.open(AddItemComponent);
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

}

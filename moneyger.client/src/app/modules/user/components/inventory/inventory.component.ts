import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemComponent } from '../add-item/add-item.component';
import { EditItemComponent } from '../edit-item/edit-item.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {
  searchText = '';
  checkedContacts: { [key: string]: boolean } = {};

  constructor(
    public dialog: MatDialog,
  ){}

  isAnyCheckboxChecked(): boolean {
    return Object.values(this.checkedContacts).some(isChecked => isChecked);
  }

  addItem(){
    const dialogRef = this.dialog.open(AddItemComponent);
  }

  editItem(){
    const dialogRef = this.dialog.open(EditItemComponent);
  }
}

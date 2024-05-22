import { Component } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {
  searchText = '';
  checkedContacts: { [key: string]: boolean } = {};

  isAnyCheckboxChecked(): boolean {
    return Object.values(this.checkedContacts).some(isChecked => isChecked);
  }
}

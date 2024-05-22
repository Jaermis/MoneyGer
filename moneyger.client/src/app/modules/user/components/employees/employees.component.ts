import { Component } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  searchText = '';
  checkedContacts: { [key: string]: boolean } = {};

  isAnyCheckboxChecked(): boolean {
    return Object.values(this.checkedContacts).some(isChecked => isChecked);
  }
}

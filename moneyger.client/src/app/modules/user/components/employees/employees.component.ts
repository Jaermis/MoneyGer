import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  searchText = '';
  checkedContacts: { [key: string]: boolean } = {};

  constructor(
    public dialog: MatDialog,
  ){}

  isAnyCheckboxChecked(): boolean {
    return Object.values(this.checkedContacts).some(isChecked => isChecked);
  }

  addEmployeeDialog(){
    const dialogRef = this.dialog.open(AddEmployeeComponent);
  }

  editEmployeeDialog(){
    const dialogRef = this.dialog.open(EditEmployeeComponent);
  }
}

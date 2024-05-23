import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EmployeeRequest } from '../../../../interfaces/employee-request';
import { HttpErrorResponse } from '@angular/common/http';
import { CompanyService } from '../../../../shared/company.service';
import { ValidationErrors } from '@angular/forms';
import { AuthResponse } from '../../../../interfaces/auth-response';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit{
  searchText = '';
  checkedContacts: { [key: string]: boolean } = {};

  constructor(
    public dialog: MatDialog,
    private companyService: CompanyService
  ){}

  ngOnInit(): void {
    this.getEmployees();
  }

  employees:EmployeeRequest[] =[];
  errors:ValidationErrors[] = [];
  checkedEmployee: { [key: string]: boolean } = {};

  isAnyCheckboxChecked(): boolean {
    return Object.values(this.checkedEmployee).some(isChecked => isChecked);
  }

  onCheckboxChange(EmployeeId: string, event: any): void {
    this.checkedEmployee[EmployeeId] = event.target.checked;
  }

  addEmployeeDialog(){
    const dialogRef = this.dialog.open(AddEmployeeComponent);
  }

  getEmployees(): void {
    this.companyService.getEmployees().subscribe({
      next: (response: EmployeeRequest[]) => {
        this.employees = response;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.errors = err.error;
        }
        console.error(err.message);
      },
    });
  }

  deleteSelectedEmployee(): void {
    const employeeToDelete = Object.keys(this.checkedEmployee).filter(contactId => this.checkedEmployee[contactId]);

    if (employeeToDelete.length > 0) {
      this.companyService.deleteEmployees(employeeToDelete).subscribe({
        next: (response: AuthResponse) => {
          if (response.isSuccess) {
            this.employees = this.employees.filter(contact => !employeeToDelete.includes(contact.id));
            this.checkedEmployee = {};  // Reset the checked employee
          } else {
            console.error('Error deleting employee:', response.message);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error deleting employee:', err.message);
        },
        
      complete:()=>this.ngOnInit(),
      });
    }
  }
}

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from '../../../../shared/company.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  constructor(
    public DialogRef: MatDialogRef<AddEmployeeComponent>,
    private companyService: CompanyService
  ){}

  email:string='';

  closeDialog() {
    this.DialogRef.close();
  }

  addEmployee() {
    if(!this.email)
      alert("Please enter a valid email");
    else{
      this.companyService.addEmployee(this.email).subscribe({
        next: (response) => {
          this.closeDialog();
        },
        error: (err: HttpErrorResponse) => {
          alert("Please enter an existing email");
        },
        complete: () => alert("Invitation Link Sent Successfully!")
      });
    }
  } 
}
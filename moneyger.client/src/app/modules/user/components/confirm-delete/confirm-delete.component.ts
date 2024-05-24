import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from '../../../../shared/company.service';
import { AuthResponse } from '../../../../interfaces/auth-response';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/auth.service';


@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: string, item: 'Account' | 'Business Data' | 'Company'},
    private companyService: CompanyService,
    private router: Router,
    private authService: AuthService
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  deleteItem() {
    switch (this.data.item) {
      case 'Account':
        this.authService.deleteAccount().subscribe({
          next: (response: AuthResponse) => {
            if (response.isSuccess) {
              this.router.navigate(['/login']);
            } else {
              console.error('Error deleting contacts:', response.message);
            }
          },
          error: () => {
          },
          complete:()=>{
            this.closeDialog(),
            this.router.navigate(['/login']);
          }
        });
        break;
      case 'Business Data':
        // Call the clearCompanyData method from the CompanyService
        this.companyService.clearCompanyData().subscribe({
          next: (response: AuthResponse) => {
            if (response.isSuccess) {
            } else {
              console.error('Error deleting contacts:', response.message);
            }
          },
          error: () => {
          },
        });
        break;
      case 'Company':
        // Call the deleteCompany method from the CompanyService
        this.companyService.deleteCompany().subscribe({
          next: (response: AuthResponse) => {
            if (response.isSuccess) {
            } else {
              console.error('Error deleting contacts:', response.message);
            }
          },
          error: () => {
          },
        });
        break;
    }
  }
}
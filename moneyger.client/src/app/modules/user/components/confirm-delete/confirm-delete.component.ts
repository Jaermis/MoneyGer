import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from '../../../../shared/company.service';


@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: string, item: 'Account' | 'Business Data' | 'Company', companyId?: string },
    private companyService: CompanyService
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  deleteItem() {
    switch (this.data.item) {
      case 'Account':
        // Call the deleteAccount method from your service
        break;
      case 'Business Data':
        // Call the clearCompanyData method from the CompanyService
        if (this.data.companyId) {
          this.companyService.clearCompanyData(this.data.companyId).subscribe(
            response => {
              // Handle the successful response
              this.dialogRef.close(true);
            },
            error => {
              // Handle the error
            }
          );
        } else {
          // Handle the case when companyId is undefined
          console.error('Company ID is undefined');
        }
        break;
      case 'Company':
        // Call the deleteCompany method from the CompanyService
        if (this.data.companyId) {
          this.companyService.deleteCompany(this.data.companyId).subscribe(
            response => {
              // Handle the successful response
              this.dialogRef.close(true);
            },
            error => {
              // Handle the error
            }
          );
        } else {
          // Handle the case when companyId is undefined
          console.error('Company ID is undefined');
        }
        break;
    }
  }
}
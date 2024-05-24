import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { EditCompanyComponent } from '../edit-company/edit-company.component';
import { ReportComponent } from '../report/report.component';
import { AuthService } from '../../../../shared/auth.service';
import { Observable } from 'rxjs';
import { UserCompanyDetail } from '../../../../interfaces/user-company-detail';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  constructor(
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getCompany();
  }

  currentCompanyId!: Observable<UserCompanyDetail>
  companyId: UserCompanyDetail = {
    user: '',
    role: '',
    company:''
  };

  errors: ValidationErrors[] =[];

  deleteAction(actionType: string, actionItem: 'Account' | 'Business Data' | 'Company') {
    const data = {
      action: actionType,
      item: actionItem,
      companyId: this.companyId.company
    };

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the response from ConfirmDeleteComponent
      }
    });
  }

  getCompany(): void {
    this.authService.getUserCompany().subscribe({
      next: (response: UserCompanyDetail) => {
        this.companyId= response;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.errors = err.error;
        }
        console.error(err.message);
      }
    });
  }

  editCompany() {
    const dialogRef = this.dialog.open(EditCompanyComponent);
  }

  reportIssue() {
    const dialogRef = this.dialog.open(ReportComponent);
  }
}
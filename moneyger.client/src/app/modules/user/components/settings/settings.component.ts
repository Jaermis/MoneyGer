import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { EditCompanyComponent } from '../edit-company/edit-company.component';
import { ReportComponent } from '../report/report.component';
import { AuthService } from '../../../../shared/auth.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  constructor(
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  deleteAction(actionType: string, actionItem: 'Account' | 'Business Data' | 'Company') {
    const currentCompanyId = this.authService.getCurrentCompanyId();

    const data = {
      action: actionType,
      item: actionItem,
      companyId: currentCompanyId
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

  editCompany() {
    const dialogRef = this.dialog.open(EditCompanyComponent);
  }

  reportIssue() {
    const dialogRef = this.dialog.open(ReportComponent);
  }
}
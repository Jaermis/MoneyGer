import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { EditCompanyComponent } from '../edit-company/edit-company.component';
import { ReportComponent } from '../report/report.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  constructor(
    public dialog: MatDialog
  ){}

  deleteAction(actionType: string){
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {action: actionType}
    })
  }

  editCompany(){
    const dialogRef = this.dialog.open(EditCompanyComponent);
  }

  reportIssue(){
    const dialogRef = this.dialog.open(ReportComponent);
  }
}

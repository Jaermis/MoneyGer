import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  constructor(
    public dialogRef: MatDialogRef<ReportComponent>
  ){}

  close(){
    this.dialogRef.close();
  }
}

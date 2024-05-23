import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrl: './edit-company.component.css'
})
export class EditCompanyComponent {
  constructor(
    public dialogRef: MatDialogRef<EditCompanyComponent>,
  ){}

  onNoClick(){
    this.dialogRef.close();
  }
}

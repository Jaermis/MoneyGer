import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent {
  constructor(
    public DialogRef: MatDialogRef<EditEmployeeComponent>,
  ){}

  closeDialog(){
    this.DialogRef.close();
  }
}

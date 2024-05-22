import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  constructor(
    public DialogRef: MatDialogRef<AddEmployeeComponent>,
  ){}

  closeDialog() {
    this.DialogRef.close();
  }
}

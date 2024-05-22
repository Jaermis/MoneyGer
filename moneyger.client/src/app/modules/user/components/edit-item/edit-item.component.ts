import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.css'
})
export class EditItemComponent {
  constructor(
    public dialogRef: MatDialogRef<EditItemComponent>,
  ){}

  closeDialog() {
    this.dialogRef.close();
  }
}

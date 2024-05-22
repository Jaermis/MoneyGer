import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {
  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
  ){}

  closeDialog(){
    this.dialogRef.close();
  }
}

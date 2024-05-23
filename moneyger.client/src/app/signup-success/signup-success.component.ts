import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup-success',
  templateUrl: './signup-success.component.html',
  styleUrl: './signup-success.component.css'
})
export class SignupSuccessComponent {
  constructor(
    public dialogRef: MatDialogRef<SignupSuccessComponent>,
  ){}

  close(){
    this.dialogRef.close();
  }
}

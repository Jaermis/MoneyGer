import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-invite-success',
  templateUrl: './invite-success.component.html',
  styleUrl: './invite-success.component.css'
})
export class InviteSuccessComponent {
  constructor(
    public dialogRef: MatDialogRef<InviteSuccessComponent>
  ){}

  close(){
    this.dialogRef.close();
  }
}

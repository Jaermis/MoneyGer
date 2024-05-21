import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CreateCompanyComponent } from '../create-company/create-company.component';
import { JoinCompanyComponent } from '../join-company/join-company.component';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrl: './getting-started.component.css'
})
export class GettingStartedComponent {
  constructor(
    private titleService: Title, private router: Router,
    public dialogRef: MatDialogRef<GettingStartedComponent>,
    public dialog: MatDialog
    ) {}

    ngOnInit(): void {
      this.titleService.setTitle('Getting Started');
    }

    CreateCompany(){
      this.onNoClick();
      const dialogRef = this.dialog.open(CreateCompanyComponent);
    }

    JoinCompany(){
      this.onNoClick();
      const dialogRef = this.dialog.open(JoinCompanyComponent);
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
}

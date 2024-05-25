import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CompanyJoin } from '../../../../interfaces/company-join';
import { ValidationError } from '../../../../interfaces/validation-error';
import { CompanyService } from '../../../../shared/company.service';
import { AuthService } from '../../../../shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GettingStartedComponent } from '../getting-started/getting-started.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-join-company',
  templateUrl: './join-company.component.html',
  styleUrl: './join-company.component.css',
  standalone:true,
  imports:[FormsModule, RouterLink, MatProgressSpinner, CommonModule]
})

export class JoinCompanyComponent implements OnInit {
  joinCompany: CompanyJoin = {
    userId: '',
    roleId: '',
    companyId: ''
  };
  errors: ValidationError[] = [];
  loading: boolean = false;

  constructor(
    private titleService: Title,
    private companyService: CompanyService,
    private authService: AuthService,
    public router: Router,
    public dialogRef: MatDialogRef<JoinCompanyComponent>,
    public dialog: MatDialog
  ) {
    dialogRef.disableClose = true;
  }

    ngOnInit(): void {
      this.titleService.setTitle('Join a Company');
      this.joinCompany.userId = this.authService.getUserDetail()?.id || '';
    }

    Cancel(){
      this.router.navigate(['user/getting-started']);
    }

    isLoggedIn(){
      return this.authService.isLoggedIn();
    }
    
    JoinCompany(){
      this.loading = true;
      this.companyService.joinCompany(this.joinCompany).subscribe({
        next:(response)=>{
          this.closeDialog();
           this.router.navigate(['/pos']);
        },
        error:(err:HttpErrorResponse)=>{
          if(err!.status ==  400){
            this.errors=err!.error;
          }
          console.log(err.message);
          this.loading = false;
        },

        complete:()=>{
          const dialogRef = this.dialog.open(SuccessDialogComponent);
          this.loading = false;
        }
      });
    }

    onNoClick(): void {
      this.dialogRef.close();
      const dialogRef = this.dialog.open(GettingStartedComponent);
    }
  
    closeDialog(): void {
      this.dialogRef.close();
    }
}

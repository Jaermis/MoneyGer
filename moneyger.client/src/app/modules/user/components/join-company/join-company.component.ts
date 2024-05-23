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


@Component({
  selector: 'app-join-company',
  templateUrl: './join-company.component.html',
  styleUrl: './join-company.component.css',
  standalone:true,
  imports:[FormsModule, RouterLink]
})

export class JoinCompanyComponent implements OnInit {
  joinCompany: CompanyJoin = {
    userId: '',
    roleId: '',
    companyId: ''
  };
  errors: ValidationError[] = [];

  constructor(
    private titleService: Title,
    private companyService: CompanyService,
    private authService: AuthService,
    public router: Router,
    public dialogRef: MatDialogRef<JoinCompanyComponent>,
    public dialog: MatDialog
  ) {}

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
        },

        complete:()=>{
          const dialogRef = this.dialog.open(SuccessDialogComponent);
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

import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { CompanyService } from '../../../../shared/company.service';
import { Role } from '../../../../interfaces/role';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationError } from '../../../../interfaces/validation-error';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginComponent } from '../../../../login/login.component';
import { CommonModule } from '@angular/common';
import { CompanyRequest } from '../../../../interfaces/company-request';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.css',
  standalone:true,
  imports:[FormsModule, RouterLink]
})

export class CreateCompanyComponent implements OnInit {
  makeCompany: CompanyRequest = {
    name: '',
    location: ''
  };
  errors: ValidationError[] = [];

  constructor(
    private titleService: Title,
    private companyService: CompanyService,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Create a Company');
  }

    Cancel(){
      this.router.navigate(['/user/getting-started']);
    }

    isLoggedIn(){
      return this.authService.isLoggedIn();
    }

  createCompany(){
    this.companyService.createCompany(this.makeCompany).subscribe({
      next:(response)=>{
          this.router.navigate(['/user/home']);
      },
      error:(err:HttpErrorResponse)=>{
        if(err!.status ==  400){
          this.errors=err!.error;
        }
        console.log(err.message);
      },

      complete:()=>alert('Company creation successful'),
    });
  }
}
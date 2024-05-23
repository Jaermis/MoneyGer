import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router, RouterLink } from '@angular/router';
import { RoleService } from '../shared/role.service';
import { Observable } from 'rxjs';
import { Role } from '../interfaces/role';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationError } from '../interfaces/validation-error';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { SignupSuccessComponent } from '../signup-success/signup-success.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [ReactiveFormsModule,RouterLink,CommonModule, MatProgressSpinnerModule]
})
export class SignupComponent implements OnInit {
  constructor(
    private titleService: Title, private router: Router,
    public dialog: MatDialog
  ) { }
    
    changeicon:boolean = true;
    changetype:boolean = true;
    loading: boolean = false;

    authService = inject(AuthService);
    roleService = inject(RoleService); //Kuyog ni sa getRole
    roles$!:Observable<Role[]>; //Kuyog ni sa getRole
    form!: FormGroup;
    fb = inject(FormBuilder);
    errors!:ValidationError[];
    
    ngOnInit(): void {
      this.titleService.setTitle('MoneyGer Signup');
      
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['',[Validators.required]],
        firstname: ['',Validators.required],
        lastname: ['',Validators.required],
        confirmPassword:['',Validators.required],
        phoneNumber:['',Validators.required]
      },
      {
        validator:this.passwordMatchValidator,
      }
    );

      this.roles$ = this.roleService.getRoles(); //Ibalhin unya ni sa kung asa magamit
    }

    register(){
      this.loading = true;
      console.log(this.form.value);
      this.authService.register(this.form.value).subscribe({
        next:(response)=>{
          //console.log(response);
          this.router.navigate(['/login']);
        },
        error:(err:HttpErrorResponse)=>{
          alert('Signup Failed. Try Again')
          if(err!.status ==  400){
            this.errors=err!.error;
          }
          this.loading = false;
        },
        complete:()=>{
          const dialogRef = this.dialog.open(SignupSuccessComponent);
        }
      });
    }

    private passwordMatchValidator(control:AbstractControl):{[key:string]:boolean} | null{
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if(password != confirmPassword){
        return {passwordMismatch: true};
      }
      return null;
    }

    viewpass(){
      this.changeicon = !this.changeicon;
      this.changetype = !this.changetype;
    }
}

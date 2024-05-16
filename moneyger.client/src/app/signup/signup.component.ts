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

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [ReactiveFormsModule,RouterLink,CommonModule]
})
export class SignupComponent implements OnInit {
  constructor(
    private titleService: Title, private router: Router
  ) { }
    
    changeicon:boolean = true;
    changetype:boolean = true;

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
        confirmPassword:['',Validators.required]
      },
      {
        validator:this.passwordMatchValidator,
      }
    );

      this.roles$ = this.roleService.getRoles(); //Ibalhin unya ni sa kung asa magamit
    }

    register(){
      console.log(this.form.value);
      this.authService.register(this.form.value).subscribe({
        next:(response)=>{
          //console.log(response);
          this.router.navigate(['/login']);

        },
        error:(err:HttpErrorResponse)=>{
          if(err!.status ==  400){
            this.errors=err!.error;
          }
        },

        complete:()=>alert('Signup successful. Check your email for the confirmation link'),
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

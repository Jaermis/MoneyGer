import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule,RouterLink,MatProgressSpinnerModule,CommonModule], 
})
export class LoginComponent implements OnInit {
  constructor(
    private titleService: Title, private router: Router
    ) {} 

  authService = inject(AuthService);
  form!: FormGroup;
  fb = inject(FormBuilder);
  
  changeicon:boolean = true;
  changetype:boolean = true;
  showImg: boolean = false;
  loading: boolean = false;
  
  ngOnInit(): void {
    this.titleService.setTitle('MoneyGer Login');
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',Validators.required],
    });
  }

  viewpass(){
    this.changetype = !this.changetype;
    this.changeicon = !this.changeicon;
  }

  login(){
    this.loading = true;
    this.authService.login(this.form.value).subscribe({
      next:()=>{
        this.authService.getUserCompany().subscribe({
          next:(company)=>{
            if (company.role == 'New User') {
              this.router.navigate(['/user/getting-started']); // Navigate based on the role condition
            } 
            else if (company.role == 'Member'){
              this.router.navigate(['/pos']); // Navigate to default route for other cases
            }
            else{
              this.router.navigate(['/user/home']);
            }
          },
          error:()=>{
            alert("Fetching data failed");
            this.loading = false;
          }
        });
      },
      error:(error)=>{
        alert("Login Failed");
        this.loading = false;
      }
    });
  }

  signup(){
    this.router.navigate(['/signup']);
  }
}

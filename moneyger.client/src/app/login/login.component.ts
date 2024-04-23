import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MoneygerUsersService } from '../shared/moneyger-users.service';
import { AuthService } from '../shared/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  constructor(
    private titleService: Title, public service: MoneygerUsersService, private router: Router
    ) {} 

  authService = inject(AuthService);
  form!: FormGroup;
  fb = inject(FormBuilder);
  
  changeicon:boolean = true;
  changetype:boolean = true;
  showImg: boolean = false;

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
    this.authService.login(this.form.value).subscribe({
      next:(response)=>{
        alert("Login succesful!");
        this.router.navigate(['/user']);
        },
        error:(error)=>{
          alert("Login Failed");
        }
      }
    );
  }
}

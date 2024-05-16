import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule,RouterLink]
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
        const company = this.authService.getUserDetail()?.company;
        if (company == 'N/A') {
          this.router.navigate(['/user/getting-started']); // Navigate based on the role condition
        } 
        else {
          this.router.navigate(['/user/home']); // Navigate to default route for other cases
        }
      },
      error:(error)=>{
        alert("Login Failed");
      }
    });
  }

  signup(){
    this.router.navigate(['/signup']);
  }
}

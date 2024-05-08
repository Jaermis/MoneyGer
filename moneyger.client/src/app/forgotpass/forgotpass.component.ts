import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css'],
  standalone: true,
  imports:[FormsModule, RouterLink]
})
export class ForgotpassComponent implements OnInit {
  constructor(
    private titleService: Title
    ) { }

    ngOnInit(): void {
      this.titleService.setTitle('Forgot Password');
    }

    email!:string;
    authService=inject(AuthService);
    showEmailSent = false;
    isSubmitting = false;

    forgotPassword(){
      this.authService.forgotPassword(this.email).subscribe({
        next:(response)=>{
          if(response.isSuccess){
            alert("Email sent");
            this.showEmailSent = true;
          }
          else{
            alert("eyy");
          }
        },
        error: (error) => {
          alert(error.message);
        },
        complete:()=>{
          this.isSubmitting = false;
        }
      })
    }
}

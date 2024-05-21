import { Component, OnInit, inject } from '@angular/core';
import { ResetPasswordRequest } from '../interfaces/reset-password-request';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
  standalone: true,
  imports:[FormsModule, RouterLink]
})
export class ResetPasswordComponent implements OnInit{
  resetPassword ={} as ResetPasswordRequest;
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.resetPassword.email = params["email"];
      const decodedToken = encodeURIComponent(params["token"]);
      this.resetPassword.token = decodedToken;
    });
  }

  resetPasswordHandle(){
    this.authService.resetPassword(this.resetPassword).subscribe({
      next:(response)=>{
        if(response.isSuccess){
          alert("Password Reset Successfully!");
        }
        else{
          alert("Password Reset Failed!");
        }
        this.router.navigate(['/login']);
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.error.message);
      }
    });
  }
}

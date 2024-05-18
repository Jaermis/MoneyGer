import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../shared/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(
    private common:CommonModule)
    {}
    authService = inject(AuthService);
    isActive: boolean = false;

    isLoggedIn(){
      return this.authService.isLoggedIn();
    }
}

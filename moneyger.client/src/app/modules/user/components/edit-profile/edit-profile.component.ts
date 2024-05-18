import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../shared/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  constructor(
    private common:CommonModule
  ){}
  authService = inject(AuthService);
  isActive: boolean = false;

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }
}
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { AuthService } from '../../../../shared/auth.service';
import { EditProfile } from '../../../../interfaces/edit-profile';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationError } from '../../../../interfaces/validation-error';
import { Router, RouterConfigurationFeature, RouterLink } from '@angular/router';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  @Output() profileUpdated = new EventEmitter<void>();
  userDetail: any;
  editProfileRequest: EditProfile = {
    phoneNumber: '',
    facebook: '',
    twitter: '',
    instagram: ''
  };

  errors: ValidationError[] = [];

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {
    this.userDetail = this.authService.getUserDetail();
    this.editProfileRequest = {
      phoneNumber: this.userDetail.phonenumber,
      facebook: this.userDetail.facebook,
      twitter: this.userDetail.twitter,
      instagram: this.userDetail.instagram
    };
  }

  isActive: boolean = false;

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  editProfile(): void {
    this.authService.editProfile(this.editProfileRequest).subscribe(
      (response) => {
        console.log('Profile updated successfully:', response);
        // Refresh user details
        this.userDetail = this.authService.getUserDetail();      
        this.profileUpdated.emit();  
      },
      (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.errors = err.error;
        }
        console.error(err.message, err.headers);
      }
    );
  }

  gotoHome(){
    this.router.navigate(['/user/home']);
  }
}
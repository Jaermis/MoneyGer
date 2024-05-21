import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../../../shared/auth.service';
import { EditProfile } from '../../../../interfaces/edit-profile';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationError } from '../../../../interfaces/validation-error';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  userDetail: any;
  editProfileRequest: EditProfile = {
    phoneNumber: '',
    facebook: '',
    twitter: '',
    instagram: ''
  };

  errors: ValidationError[] = [];

  constructor(public authService: AuthService) {}

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
      },
      (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.errors = err.error;
        }
        console.error(err.message, err.headers);
      }
    );
  }
}
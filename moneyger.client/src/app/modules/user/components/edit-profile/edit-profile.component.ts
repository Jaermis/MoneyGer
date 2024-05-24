import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/auth.service';
import { EditProfile } from '../../../../interfaces/edit-profile';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationError } from '../../../../interfaces/validation-error';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';
import { SharedService } from '../../../../shared/shared.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  userDetail: any;
  editProfileRequest: EditProfile = {
    fullname:'',
    phoneNumber: '',
    facebook: '',
    twitter: '',
    instagram: ''
  };
  firstName: string = '';
  lastName: string = '';

  errors: ValidationError[] = [];

  constructor(
    public authService: AuthService,
    public router: Router,
    public dialog: MatDialog,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.userDetail = this.authService.getUserDetail();
    this.editProfileRequest = {
      fullname: '',
      phoneNumber: this.userDetail.phonenumber,
      facebook: this.userDetail.facebook,
      twitter: this.userDetail.twitter,
      instagram: this.userDetail.instagram
    };
  }

  isActive: boolean = false;

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  editProfile(): void {
    this.editProfileRequest.fullname = this.firstName +" "+ this.lastName;
    this.authService.editProfile(this.editProfileRequest).subscribe(
      (response) => {
        console.log('Profile updated successfully:', response);
        // Trigger profile refresh
        this.sharedService.triggerRefreshProfile();
        // Refresh user details
        this.userDetail = this.authService.getUserDetail();
        this.gotoHome();
      },
      (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.errors = err.error;
        }
        console.error(err.message, err.headers);
      }
    );
  }
  
  gotoHome() {
    this.router.navigate(['/user/home']);
  }
}

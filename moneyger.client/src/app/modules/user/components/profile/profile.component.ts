import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../../shared/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { UserCompanyDetail } from '../../../../interfaces/user-company-detail';
import { Observable } from 'rxjs';
import { SharedService } from '../../../../shared/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  userDetail: any;
  constructor(
    private common: CommonModule,
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<ProfileComponent>,
    public dialog: MatDialog,
    private sharedService:SharedService
  ) {}
  
  ngOnInit(): void {
    this.loadUserDetails();

    // Subscribe to the profile refresh event
    this.sharedService.refreshProfile$.subscribe(() => {
      this.loadUserDetails();
    });
  }

  loadUserDetails() {
    this.userDetail = this.authService.getUserDetail();
  }

  authService = inject(AuthService);
  isActive: boolean = false;

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  formatUrl(url: string): SafeResourceUrl {
    if (url) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openDialog(): void {
    this.onNoClick();
    const dialogRef = this.dialog.open(EditProfileComponent);
  }
}
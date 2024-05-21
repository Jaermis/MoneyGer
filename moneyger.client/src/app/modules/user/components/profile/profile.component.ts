import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../shared/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(
    private common: CommonModule,
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<ProfileComponent>,
    public dialog: MatDialog
  ) {}

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
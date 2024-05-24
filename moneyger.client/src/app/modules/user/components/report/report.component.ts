import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../../../interfaces/auth-response';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../../shared/auth.service';
import { environment } from '../../../../../environments/environment.development';
import { InviteSuccessComponent } from '../invite-success/invite-success.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  apiUrl:string = environment.apiBaseUrl;
  
  constructor(
    public dialogRef: MatDialogRef<ReportComponent>,
    private authService: AuthService,
    private http:HttpClient
  ){}
  
  description!:string;

  addTickets() {
    if(!this.description)
      alert("Please enter a valid description");

    else{
      this.addTicket(this.description).subscribe({
        next: (response) => {
        },
        error: (err: HttpErrorResponse) => {
          alert(err.message);
        },
        complete: () => {
          this.close();
        }
      });
    }
  } 

  addTicket(data: string): Observable<AuthResponse> {
    const headers = new HttpHeaders('content-type: application/json').set('Authorization', `Bearer ${this.authService.getToken()}`);
    const body = JSON.stringify(data);
    return this.http.post<AuthResponse>(`${this.apiUrl}/ReportTicket`, body, { headers });
  }

  close(){
    this.dialogRef.close();
  }
}

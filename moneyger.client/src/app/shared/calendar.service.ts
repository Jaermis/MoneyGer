import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginRequest } from '../interfaces/login-request';
import { Observable, map } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TmplAstSwitchBlockCase } from '@angular/compiler';
import { jwtDecode } from 'jwt-decode';
import { Role } from '../interfaces/role';
import { CompanyRequest } from '../interfaces/company-request';
import { CompanyJoin } from '../interfaces/company-join';
import { AuthService } from './auth.service';
import { EventRequest } from '../interfaces/event-request';
import { EventAttendee } from '../interfaces/event-attendee';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  apiUrl:string = environment.apiBaseUrl;
  
  constructor(private http:HttpClient, private authService: AuthService) { }

  addEvent(data:EventRequest):Observable<AuthResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.post<AuthResponse>(`${this.apiUrl}/Events`, data, { headers });
  }

  getEvents(): Observable<EventAttendee[]> { // Change the return type to match the expected array of Events
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.get<EventAttendee[]>(`${this.apiUrl}/Attendee/AllAttendees`, { headers });
  }
}

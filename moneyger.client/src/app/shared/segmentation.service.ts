import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, map } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { EventRequest } from '../interfaces/event-request';
import { EventAttendee } from '../interfaces/event-attendee';
import { SegmentationRequest } from '../interfaces/segmentation-request';

@Injectable({
  providedIn: 'root'
})
export class SegmentationService {
  apiUrl:string = environment.apiBaseUrl;
  
  constructor(private http:HttpClient, private authService: AuthService) { }

  addSegmentation(data:SegmentationRequest[]):Observable<AuthResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.post<AuthResponse>(`${this.apiUrl}/Segmentation`, data, { headers });
  }

  getSegmentation(): Observable<SegmentationRequest[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.get<SegmentationRequest[]>(`${this.apiUrl}/Segmentation`, { headers });
  }
}

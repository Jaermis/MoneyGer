import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, map } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { SalesRequest } from '../interfaces/sales-request';


@Injectable({
    providedIn: 'root'
  })
  export class SalesService {
    apiUrl:string = environment.apiBaseUrl;
    
    constructor(private http:HttpClient, private authService: AuthService) { }
  
    addSale(data:SalesRequest):Observable<AuthResponse> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
      return this.http.post<AuthResponse>(`${this.apiUrl}/Sale`, data, { headers });
    }
    getSales(): Observable<SalesRequest[]> { // Change the return type to match the expected array of Events
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
      return this.http.get<SalesRequest[]>(`${this.apiUrl}/Sale/AllInventory`, { headers });
    }
  }


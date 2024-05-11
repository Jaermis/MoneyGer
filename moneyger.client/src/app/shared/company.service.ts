import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginRequest } from '../interfaces/login-request';
import { Observable, map } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient } from '@angular/common/http';
import { TmplAstSwitchBlockCase } from '@angular/compiler';
import { jwtDecode } from 'jwt-decode';
import { Role } from '../interfaces/role';
import { CompanyRequest } from '../interfaces/company-request';
import { CompanyJoin } from '../interfaces/company-join';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  apiUrl:string = environment.apiBaseUrl;
  
  constructor(private http:HttpClient) { }

  createCompany = (data:CompanyRequest):Observable<AuthResponse>=>
    this.http.post<AuthResponse>(`${this.apiUrl}/Company`, data);

  
  joinCompany = (data:CompanyJoin):Observable<AuthResponse>=>
    this.http.post<AuthResponse>(`${this.apiUrl}/Company/AssignCompany`, data);
}

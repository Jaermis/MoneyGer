import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginRequest } from '../interfaces/login-request';
import { Observable, map } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient } from '@angular/common/http';
import { TmplAstSwitchBlockCase } from '@angular/compiler';
import { jwtDecode } from 'jwt-decode';
import { Role } from '../interfaces/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  apiUrl:string = environment.apiBaseUrl;
  
  constructor(private http:HttpClient) { }

  getRoles=():Observable<Role[]>=>
    this.http.get<Role[]>(`${this.apiUrl}Roles`)
}

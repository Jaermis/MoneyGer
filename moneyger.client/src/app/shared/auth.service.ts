import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginRequest } from '../interfaces/login-request';
import { Observable, map } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient } from '@angular/common/http';
import { TmplAstSwitchBlockCase } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl:string = environment.apiBaseUrl;
  private tokenKey = 'token'

  constructor(private http:HttpClient) { }

  login(data:LoginRequest):Observable<AuthResponse>{
    return this.http
    .post<AuthResponse>(`${this.apiUrl}/moneyger_users/Login`, data)
    .pipe(
      map((response)=>{
        if(response.isSuccess){
          localStorage.setItem(this.tokenKey,response.token);
        }
          return response;
      })
    )
  }
}

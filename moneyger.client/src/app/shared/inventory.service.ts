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
import { InventoryRequest } from '../interfaces/inventory-request';
import { InventoryCreate } from '../interfaces/inventory-create';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  apiUrl:string = environment.apiBaseUrl;
  
  constructor(private http:HttpClient, private authService: AuthService) { }

  createProduct(data: InventoryCreate): Observable<AuthResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.post<AuthResponse>(`${this.apiUrl}/Inventory`, data, { headers });
  }

  getInventory(): Observable<InventoryRequest[]> { 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.get<InventoryRequest[]>(`${this.apiUrl}/Inventory/AllInventory`, { headers });
  }

  deleteItems(inventoryIds: number[]): Observable<AuthResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.request<AuthResponse>('delete', `${this.apiUrl}/Inventory`, {
      body: inventoryIds,
      headers: headers
    });
  }
}

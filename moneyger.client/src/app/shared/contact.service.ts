import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContactRequest } from '../interfaces/contact-request'; // Make sure to import the interface for Contacts
import { AuthService } from './auth.service';
import { AuthResponse } from '../interfaces/auth-response';
import { NewContactRequest } from '../interfaces/new-contact-request';
import { EditStatusRequest } from '../interfaces/edit-status-request';
import { EditContact } from '../interfaces/edit-contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  apiUrl: string = environment.apiBaseUrl;
  
  constructor(private http: HttpClient, private authService: AuthService) { }

  getContacts(): Observable<ContactRequest[]> { // Change the return type to match the expected array of Contacts
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.get<ContactRequest[]>(`${this.apiUrl}/Contact/AllCompany`, { headers });
  }

  addContact(data:NewContactRequest):Observable<AuthResponse>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.post<AuthResponse>(`${this.apiUrl}/Contact`, data, { headers });
  }

  deleteContacts(contactIds: string[]): Observable<AuthResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.request<AuthResponse>('delete', `${this.apiUrl}/Contact/Delete`, {
      body: contactIds,
      headers: headers
    });
  }

  updateStatus(data:EditStatusRequest): Observable<AuthResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.post<AuthResponse>(`${this.apiUrl}/Status/AssignStatus`, data, {headers});
  }

  editContacts(data:EditContact): Observable<AuthResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.post<AuthResponse>(`${this.apiUrl}/Contact/EditContact`, data, {headers});
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment.development';
import { MoneygerUsers } from './moneyger-users.model';

@Injectable({
  providedIn: 'root'
})

export class MoneygerUsersService {

  url: string = environment.apiBaseUrl + '/moneyger_users'
  list: MoneygerUsers[] = [];
  formData: MoneygerUsers = new MoneygerUsers()
  constructor(private http: HttpClient) {}
  
  postMoneyger_users(){
    return this.http.post(this.url,this.formData);
  }

  loggedin_user(){
    return this.http.get<any>(this.url+"/" + this.formData.workEmail);    
  }
}

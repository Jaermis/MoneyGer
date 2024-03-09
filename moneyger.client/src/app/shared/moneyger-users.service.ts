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
  constructor(private http: HttpClient) { }

  refreshlist() {
    this.http.get(this.url)
      .subscribe({
        next: res => {
          this.list = res as MoneygerUsers[];
        },
        error: err => { console.log(err) }
      })

    return this.list.length
  }

  postMoneyger_users(){
    return this.http.post(this.url,this.formData);
  }

  loginMoneyger_users(account: string) {
    return this.http.get(this.url + '/' + account);
  }
}

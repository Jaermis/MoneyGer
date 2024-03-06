import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment.development';
import { MoneygerUsers } from './moneyger-users.model';
@Injectable({
  providedIn: 'root'
})
export class MoneygerUsersService {

  url: string = environment.apiBaseUrl + '/moneyger_users1_'
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
  }

  postMoneyger_users(){
    return this.http.post(this.url,this.formData);
  }
}

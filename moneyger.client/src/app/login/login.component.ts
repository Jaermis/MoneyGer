import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MoneygerUsersService } from '../shared/moneyger-users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private titleService: Title, public service: MoneygerUsersService
    ) { } 

  changeicon:boolean = true;
  changetype:boolean = true;
  showImg: boolean = false;

  ngOnInit(): void {
    this.titleService.setTitle('MoneyGer Login');
  }

  viewpass(){
    this.changetype = !this.changetype;
    this.changeicon = !this.changeicon;
  }

  loginCheck() {
    this.service.refreshlist();
  }

  onSubmit() {
    this.loginCheck();
  }
}

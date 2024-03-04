import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private titleService: Title,
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
}
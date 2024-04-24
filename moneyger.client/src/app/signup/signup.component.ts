import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MoneygerUsersService } from '../shared/moneyger-users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(
    private titleService: Title, public service:  MoneygerUsersService
  ) { }
    
    changeicon:boolean = true;
    changetype:boolean = true;

    ngOnInit(): void {
      this.titleService.setTitle('MoneyGer Signup');
    }

    viewpass(){
      this.changeicon = !this.changeicon;
      this.changetype = !this.changetype;
    }
}

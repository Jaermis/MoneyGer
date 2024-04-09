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
    private titleService: Title, public service: MoneygerUsersService, private router: Router
    ) {} 

  workEmail: string = '';
  userPassword: string= '';
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

  loginCheck(account: string, password: string) { //Check login
    this.service.loginMoneyger_users(account,password)
      .subscribe({
        next: res => {
          if(res === 'Failure' || res === 'Success') {
            if(res === 'Failure')
              alert("Login failed");
            else{
              alert('Login Successful');
              this.router.navigate(['./user']);
            }
          } 
          else {
            // Handle unexpected response
            console.error('Unexpected response:', res);
          }
        },
        error:err=>{console.log(err);
      }
    })
  }
}

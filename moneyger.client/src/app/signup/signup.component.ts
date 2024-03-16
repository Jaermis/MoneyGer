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
    private titleService: Title, public service: MoneygerUsersService
  ) { }
    
    changeicon:boolean = true;
    changetype:boolean = true;

    ngOnInit(): void {
      this.titleService.setTitle('MoneyGer Signup');
      this.service.refreshlist();
    }

    viewpass(){
      this.changeicon = !this.changeicon;
      this.changetype = !this.changetype;
    }

    async onSubmit(){
      this.service.formData.accountID = await this.service.refreshlist();
      this.service.formData.dateCreated = new Date();
      this.service.postMoneyger_users()
      .subscribe({
        next:res=>{
          console.log(res),
          alert("Signup success");
        },
        error:err=>{console.log(err),
        alert("Signup failed")}
      })
    }
}

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(
    private titleService: Title){}

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

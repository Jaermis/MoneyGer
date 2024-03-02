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
    private router: Router
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('MoneyGer Login');
  }

  navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
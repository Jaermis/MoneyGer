import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {
  constructor(
    private titleService: Title,
    ) { }

    ngOnInit(): void {
      this.titleService.setTitle('Forgot Password');
    }
}

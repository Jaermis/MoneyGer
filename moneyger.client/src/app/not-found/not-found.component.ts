import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit{
  constructor(private router: Router, private titleService: Title) {}

  toLogin(){
    this.router.navigate(['/user/home']);
  }
  ngOnInit(): void {
    this.titleService.setTitle('Page Not Found');
  }
}

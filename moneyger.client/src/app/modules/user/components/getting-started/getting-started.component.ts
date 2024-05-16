import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrl: './getting-started.component.css'
})
export class GettingStartedComponent {
  constructor(
    private titleService: Title, private router: Router
    ) {}

    ngOnInit(): void {
      this.titleService.setTitle('Getting Started');
    }

    CreateCompany(){
      this.router.navigate(['/user/create-company']);
    }

    JoinCompany(){
      this.router.navigate(['/user/join-company']);
    }
}

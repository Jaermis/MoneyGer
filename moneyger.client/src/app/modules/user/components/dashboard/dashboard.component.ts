import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showHeader: boolean = false;
  isHomeRoute: boolean = false;

  constructor(
    private titleService: Title,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isHomeRoute = this.checkHomeRoute(this.router.url);
    this.showHeader = this.isHomeRouter(this.router.url);

    this.titleService.setTitle('User Dashboard');
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isHomeRoute = this.checkHomeRoute(event.urlAfterRedirects);
      this.showHeader = this.isHomeRoute;
    });
  }
  private isHomeRouter(url: string): boolean {
    return url === '/user/home';
  }

  private checkHomeRoute(url: string): boolean {
    return url === '/user/home';
  }
}

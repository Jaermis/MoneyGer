import { Component, HostListener } from '@angular/core';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isDesktop = true;
  constructor(
    private viewportScroller: ViewportScroller,
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isDesktop = window.innerWidth >= 1100; // Adjust the breakpoint as needed
  }

  private initializeScreenSize() {
    this.isDesktop = window.innerWidth >= 1100; // Adjust the breakpoint as needed
  }

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      this.viewportScroller.scrollToPosition([0, section.offsetTop]);
    }
  }
}

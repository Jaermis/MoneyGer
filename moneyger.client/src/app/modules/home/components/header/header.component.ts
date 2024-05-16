import { Component } from '@angular/core';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private viewportScroller: ViewportScroller,
  ) { }

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = 100;
      this.viewportScroller.scrollToPosition([0, section.offsetTop - yOffset]);
    }
  }
}

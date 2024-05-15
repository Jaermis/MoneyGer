import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    // Get references to the elements you want to animate
    const elementsToFadeIn = [
      this.elementRef.nativeElement.querySelector('app-header'),
      this.elementRef.nativeElement.querySelector('.image img'),
      this.elementRef.nativeElement.querySelector('.header-text'),
      this.elementRef.nativeElement.querySelector('.description'),
      this.elementRef.nativeElement.querySelector('.button-container')
    ];

    elementsToFadeIn.forEach((element, index) => {
      if (element) {
        setTimeout(() => {
          element.classList.add('fade-in');
        }, index * 200); // Adding staggered delay for each element (200ms interval)
      }
    });
  }
}

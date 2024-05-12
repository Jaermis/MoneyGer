import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HeaderComponent } from './components/header/header.component';
import { ScrollSpyModule } from 'ngx-scrollspy';


@NgModule({
  declarations: [
    LandingPageComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    //ScrollSpyModule.forRoot()
  ]
})
export class HomeModule { }

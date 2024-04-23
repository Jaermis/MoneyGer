import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserModule } from './modules/user/user.module';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ForgotpassComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    FormsModule,
    UserModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

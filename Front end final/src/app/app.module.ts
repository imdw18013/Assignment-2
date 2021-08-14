import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BookComponent } from './components/dashboard/book/book.component';
import { HttpClientModule } from '@angular/common/http';
import { AddEditBookComponent } from './components/dashboard/book/add-edit-book/add-edit-book.component';
import { FormsModule } from '@angular/forms';
// import { HistoryComponent } from './components/dashboard/history/history.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { ContactComponent } from './components/contact/contact.component';
import { BooklistComponent } from './components/booklist/booklist.component';
import { LandPageComponent } from './components/land-page/land-page.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ErrorPageComponent,
    HomepageComponent,
    BookComponent,
    AddEditBookComponent,
    ContactComponent,
    BooklistComponent,
    LandPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleClientId
            )
          },
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

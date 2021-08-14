import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditBookComponent } from './components/dashboard/book/add-edit-book/add-edit-book.component';
import { BookComponent } from './components/dashboard/book/book.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuardService } from './_common/auth-guard.service';
// import { HistoryComponent } from './components/dashboard/history/history.component';
import { LandPageComponent } from './components/land-page/land-page.component';
import { BooklistComponent } from './components/booklist/booklist.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    children: [
      {
        path: '',
        component: LandPageComponent,
      },
      {
        path: 'home',
        component: LandPageComponent,
      },
      {
        path: 'books',
        component: BooklistComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      // {
      //   path: 'history',
      //   component: HistoryComponent,

      // },
      {
        path: 'book',
        component: BookComponent,

      },
      {
        path: 'book/add',
        component: AddEditBookComponent,

      },
      {
        path: 'book/add/:id',
        component: AddEditBookComponent,

      },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

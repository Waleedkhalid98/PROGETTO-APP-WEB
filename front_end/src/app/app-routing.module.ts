import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { SignUpUserComponent } from './authentication/sign-up-user/sign-up-user.component';
import { LoginEmployeesComponent } from './authentication/sign_up_employees/login-employees/login-employees.component';
import { DashbordPagesComponent } from './dashbord_pages/dashbord-pages.component';
import { AccountComponent } from './dashbord_pages/account/account.component';
import { CardComponent } from './dashbord_pages/card/card.component';
import { GiftComponent } from './dashbord_pages/gift/gift.component';
import { AuthGuard } from './authentication/services/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },

  { path: 'sign-user', component: SignUpUserComponent },
  { path: 'sign_up_employees', component: LoginEmployeesComponent },

  {
    path: 'dash/employee', component: DashbordPagesComponent,canActivate:[AuthGuard],
    children: [
      {path: 'account', component : AccountComponent, canActivate:[AuthGuard]},
      {path: 'card', component : CardComponent,canActivate:[AuthGuard]},
      {path: 'gift', component : GiftComponent,canActivate:[AuthGuard]},


 ]
  },
  {
    path: 'dash/user', component: DashbordPagesComponent,canActivate:[AuthGuard],
    children: [
      {path: 'account', component : AccountComponent,canActivate:[AuthGuard]},
      {path: 'card', component : CardComponent,canActivate:[AuthGuard]},
      {path: 'gift', component : GiftComponent,canActivate:[AuthGuard]},
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

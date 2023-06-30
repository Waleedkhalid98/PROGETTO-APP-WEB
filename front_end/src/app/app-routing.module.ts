import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { SignUpUserComponent } from './authentication/sign-up-user/sign-up-user.component';
import { LoginEmployeesComponent } from './authentication/sign_up_employees/login-employees/login-employees.component';
import { DashbordPagesComponent } from './dashbord_pages/dashbord-pages.component';
import { AccountComponent } from './dashbord_pages/account/account.component';
import { CardComponent } from './dashbord_pages/card/card.component';
import { GiftComponent } from './dashbord_pages/gift/gift.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },

  { path: 'sign-user', component: SignUpUserComponent },
  { path: 'sign_up_employees', component: LoginEmployeesComponent },

  {
    path: 'dash/employee', component: DashbordPagesComponent,
    children: [
      {path: 'account', component : AccountComponent},
      {path: 'card', component : CardComponent},
      {path: 'gift', component : GiftComponent},


 ]
  },
  {
    path: 'dash/user', component: DashbordPagesComponent,
    children: [
      {path: 'account', component : AccountComponent},
      {path: 'card', component : CardComponent},
      {path: 'gift', component : GiftComponent},



    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

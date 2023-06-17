import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminNavComponent } from './components/admin/admin-nav/admin-nav.component';
import { CreateUserComponent } from './components/admin/create-user/create-user.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminHomeGuardService } from './guards/admin/admin-home-guard.service';
import { AdminLoginGuardService } from './guards/admin/admin-login-guard.service';
import { UserLoginGuardService } from './guards/user-login-guard.service';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [UserLoginGuardService],
      },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminNavComponent,
    canActivate: [AdminHomeGuardService],
    children: [
      {
        path: '',
        component: AdminHomeComponent,
      },
      {
        path: 'addUser',
        component: CreateUserComponent
      }
    ],
  },
  {
    path: 'adminLogin',
    component: AdminLoginComponent,
    canActivate: [AdminLoginGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

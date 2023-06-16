import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { Admin } from '../../../interfaces/admin.model';
import * as adminAuthActions from '../../../store/adminAuth/adminAuth.actions';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  constructor(
    private adminAuthService: AdminAuthService,
    private router: Router,
    private store: Store
  ) {}

  email: string = '';
  password: string = '';
  authMessage: string | undefined = '';

  onSubmit(form: NgForm) {
    this.adminAuthService.adminLogin(form.value).subscribe({
      next: (res) => {
        localStorage.setItem('isAdminLoggedIn', 'true');
        localStorage.setItem('adminData', JSON.stringify(res));
        this.store.dispatch(adminAuthActions.adminLogin({ admin: res }));
        this.router.navigate(['admin']);
      },
      error: (err) => {
        this.authMessage = err.error.message;
        setTimeout(() => {
          this.authMessage = undefined;
        }, 3000);
      },
    });
  }
}

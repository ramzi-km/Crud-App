import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/admin-auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  constructor(
    private adminAuthService: AdminAuthService,
    private router: Router // private store: Store<AppState>,
  ) {}

  email: string = '';
  password: string = '';
  authMessage: string = '';

  onSubmit(form: NgForm) {
    this.adminAuthService.adminLogin(form.value).subscribe({
      next: (res) => {
        localStorage.setItem('isAdminLoggedIn', 'true');
        localStorage.setItem('adminData', JSON.stringify(res));
        // this.store.dispatch(adminLogin({ users: res }));
        this.router.navigate(['/admin']);
      },
      error: (err) => {},
    });
  }
}

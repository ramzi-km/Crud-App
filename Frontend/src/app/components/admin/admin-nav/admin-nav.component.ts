import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AdminAuthService } from '../../../services/admin-auth.service';
import * as adminAuthActions from '../../../store/adminAuth/adminAuth.actions';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css'],
})
export class AdminNavComponent {
  constructor(
    private store: Store,
    private router: Router,
    private adminAuthService: AdminAuthService
  ) {}
  logout() {
    this.adminAuthService.adminLogout().subscribe({
      next: (res) => {
        localStorage.removeItem('isAdminLoggedIn');
        localStorage.removeItem('adminData');
        this.store.dispatch(adminAuthActions.adminLogout());
        this.router.navigate(['adminLogin']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

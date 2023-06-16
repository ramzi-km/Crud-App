import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../interfaces/admin.model';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private baseUrl = 'http://localhost:3000/api/admin';
  constructor(private http: HttpClient) {}

  adminLogin(admin: Admin) {
    return this.http.post(`${this.baseUrl}/login`, admin, {
      withCredentials: true,
    });
  }
  adminLogout() {
    return this.http.post(
      `${this.baseUrl}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  }
}

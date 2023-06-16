import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  userRegister(user: User) {
    return this.http.post(`${this.baseUrl}/signUp`, user);
  }
  userLogout() {
    return this.http.post(
      `${this.baseUrl}/logout`,
      {},
      { withCredentials: true }
    );
  }
  userLogin(user: User) {
    return this.http.post(`${this.baseUrl}/login`, user, {
      withCredentials: true,
    });
  }
  getUser() {
    return this.http.get(`${this.baseUrl}/user`, {
      withCredentials: true,
    });
  }
  editProfile(userDetails: FormData) {
    return this.http.post(
      `${this.baseUrl}/editProfile`,
      { userDetails },
      {
        withCredentials: true,
      }
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private baseUrl = 'http://localhost:3000/api/admin';
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(`${this.baseUrl}/users`, {
      withCredentials: true,
    });
  }
  deleteUser(id: string) {
    return this.http.delete(`${this.baseUrl}/deleteUser/${id}`, {
      withCredentials: true,
    });
  }
  createUser(payload: User) {
    return this.http.post<User>(`${this.baseUrl}/createUser`, payload, {
      withCredentials: true,
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  authenticated = false;
  constructor(
    private http: HttpClient,
    private userAuthService: UserAuthService
  ) {}
  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
  }
  logout(): void {
    this.userAuthService.userLogout().subscribe((data) => {
      this.authenticated = false;
      Emitters.authEmitter.emit(false);
    });
  }
}

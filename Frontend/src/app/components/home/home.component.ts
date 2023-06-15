import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  message = 'you are not logged in';
  constructor(
    private http: HttpClient,
    private userAuthService: UserAuthService
  ) {}
  ngOnInit(): void {
    this.userAuthService.getUser().subscribe(
      (res: any) => {
        this.message = `Hi ${res.name}`;
        Emitters.authEmitter.emit(true);
      },
      (err) => {
        this.message = 'you are not logged in';
        Emitters.authEmitter.emit(false);
      }
    );
    Emitters.authEmitter.subscribe((auth: boolean) => {
      if (!auth) {
        this.message = 'you are not logged in';
      }
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import { User } from 'src/app/interfaces/user.model';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  message = 'you are not logged in';
  userData: User = {
    id: '',
    name: '',
    email: '',
  };
  isLoggedIn = localStorage.getItem('isLoggedIn') == 'true' ? true : false;
  profileEdit = false;
  constructor(
    private http: HttpClient,
    private userAuthService: UserAuthService
  ) {}
  ngOnInit(): void {
    this.userAuthService.getUser().subscribe(
      (res: any) => {
        this.message = `hi`;
        this.userData = {
          id: res._id,
          name: res.name,
          email: res.email,
          profilePic: res.profilePic,
        };
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
        this.isLoggedIn =
          localStorage.getItem('isLoggedIn') == 'true' ? true : false;
      }
    });
  }

  editProfile() {
    this.profileEdit = !this.profileEdit;
  }
}

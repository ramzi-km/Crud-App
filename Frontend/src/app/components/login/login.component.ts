import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errMessage!: string | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userAuthService: UserAuthService
  ) {}
  ngOnInit(): void {}
  onSubmit(form: NgForm): void {
    this.userAuthService.userLogin(form.value).subscribe(
      (res) => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(res));
        this.router.navigate(['/']);
      },
      (err) => {
        this.errMessage = err.error.message;
        setTimeout(() => {
          this.errMessage = undefined;
        }, 3000);
      }
    );
  }
}

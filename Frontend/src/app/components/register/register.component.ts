import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  NgModel,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { User } from '../../interfaces/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  errMessage!: string | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userAuthService: UserAuthService
  ) {}
  ngOnInit(): void {}
  onSubmit(form: NgForm): void {
    this.userAuthService.userRegister(form.value).subscribe(
      (res) => {
        this.errMessage = undefined;
        this.router.navigate(['/login']);
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

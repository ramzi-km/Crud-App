import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { User } from 'src/app/interfaces/user.model';
import { updateUser } from 'src/app/store/usersState/users.actions';
import * as UsersSelecter from '../../../store/usersState/users.selectors';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  userForm: User = {
    name: '',
    email: '',
  };
  ngOnInit(): void {
    let fetchUser$ = this.route.paramMap.pipe(
      switchMap((param) => {
        let id = param.get('id');
        return this.store.select(UsersSelecter.selectUser(id!));
      })
    );
    fetchUser$.subscribe((data) => {
      if (data) {
        this.userForm = { ...data };
      } else {
        this.router.navigate(['/admin']);
      }
    });
  }
  onSubmit(form: NgForm) {
    this.store.dispatch(updateUser({ user: { ...this.userForm } }));
    // setTimeout(() => {
    //   this.router.navigate(['/admin']);
    // }, 1000);
    this.router.navigate(['/admin']);
  }
}

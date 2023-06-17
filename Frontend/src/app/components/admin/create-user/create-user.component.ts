import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { createUser } from 'src/app/store/usersState/users.actions';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  constructor(private store: Store, private router: Router) {}

  onSubmit(form: NgForm) {
    this.store.dispatch(createUser({ user: form.value }));
    setTimeout(() => {
      this.router.navigate(['/admin']);
    }, 1000);
  }
}

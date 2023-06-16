import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { UserServiceService } from 'src/app/services/user-service.service';
import { getUsers, getUsersSuccess } from './users.actions';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserServiceService
  ) {}

  loadAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      switchMap(() =>
        this.userService
          .getUsers()
          .pipe(map((users) => getUsersSuccess({ allUsers: users })))
      )
    )
  );
}
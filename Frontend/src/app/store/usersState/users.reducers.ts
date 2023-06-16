import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/interfaces/user.model';
import { getUsersSuccess } from './users.actions';

export const initialState: ReadonlyArray<User> = [];

export const userReducer = createReducer(
  initialState,
  on(getUsersSuccess, (state, { allUsers }) => {
    return allUsers;
  })
);

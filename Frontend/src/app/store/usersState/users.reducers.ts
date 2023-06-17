import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/interfaces/user.model';
import { deleteUserSuccess, getUsersSuccess } from './users.actions';

export const initialState: ReadonlyArray<User> = [];

export const userReducer = createReducer(
  initialState,
  on(getUsersSuccess, (state, { allUsers }) => {
    return allUsers;
  }),
  on(deleteUserSuccess, (state, { id }) => {
    let newState = state.filter((user) => user._id !== id);
    return newState;
  })
);

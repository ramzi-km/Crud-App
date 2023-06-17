import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/interfaces/user.model';
import {
  createUserSuccess,
  deleteUserSuccess,
  getUsersSuccess,
} from './users.actions';

export const initialState: ReadonlyArray<User> = [];

export const userReducer = createReducer(
  initialState,
  on(getUsersSuccess, (state, { allUsers }) => {
    return allUsers;
  }),
  on(deleteUserSuccess, (state, { id }) => {
    let newState = state.filter((user) => user._id !== id);
    return newState;
  }),
  on(createUserSuccess, (state, { resUser }) => {
    let newState = [...state,resUser];
    return newState;
  })
);

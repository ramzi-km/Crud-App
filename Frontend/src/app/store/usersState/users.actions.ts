import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/interfaces/user.model';

export const getUsers = createAction('[adminHomeComponent] getUsers');
export const getUsersSuccess = createAction(
  '[adminHomeComponent] getUsersSuccess',
  props<{ allUsers: User[] }>()
);

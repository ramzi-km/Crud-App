import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/interfaces/user.model';

export const getUsers = createAction('[adminHomeComponent] getUsers');
export const getUsersSuccess = createAction(
  '[adminHomeComponent] getUsersSuccess',
  props<{ allUsers: User[] }>()
);
export const deleteUser = createAction(
  '[adminHomeComponent] deleteUser',
  props<{ id: string }>()
);
export const deleteUserSuccess = createAction(
  '[adminHomeComponent] deleteUserSuccess',
  props<{ id: string }>()
);

export const createUser = createAction(
  '[adminHomeComponent] createUser',
  props<{ user: User }>()
);
export const createUserSuccess = createAction(
  '[adminHomeComponent] createUserSuccess',
  props<{ resUser: User }>()
);

export const updateUser = createAction(
  '[updateComponent] updateUser',
  props<{ user: User }>()
);

export const updateUserSuccess = createAction(
  '[updateComponent] updateUserSuccess',
  props<{ resUser: User }>()
);

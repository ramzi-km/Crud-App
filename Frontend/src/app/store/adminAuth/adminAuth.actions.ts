import { createAction, props } from '@ngrx/store';
import { Admin } from '../../interfaces/admin.model';

// admin login
export const adminLogin = createAction(
  '[admin-login Component] adminLogin',
  props<{ admin: Admin }>()
);
// admin logout
export const adminLogout = createAction('[admin-nav Component] adminLogout',);

import { ActionCreator, createReducer, on } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Admin } from '../../interfaces/admin.model';
import * as adminAuthActions from './adminAuth.actions';

export interface AdminState {
  admin: Admin;
  isAdminLoggedIn: boolean;
}
let admin = {
  _id: 'admin',
  email: 'admin@example.com',
};
let adminString = localStorage.getItem('adminData');
let isAdminLoggedIn = false;
if (adminString) {
  admin = JSON.parse(adminString);
}
if (localStorage.getItem('isAdminLoggedIn') == 'true') {
  isAdminLoggedIn = true;
}

export const initialState: AdminState = {
  admin: admin,
  isAdminLoggedIn: isAdminLoggedIn,
};
export const adminAuthReducer = createReducer(
  initialState,
  // admin log in to the site
  on(adminAuthActions.adminLogin, (state, { admin }) => ({
    ...state,
    isAdminLoggedIn: true,
    admin,
  })),
  on(adminAuthActions.adminLogout, (state) => ({
    ...state,
    isAdminLoggedIn: false,
    admin: {
      _id: 'admin',
      email: 'admin@example.com',
    },
  }))
);

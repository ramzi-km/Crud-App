import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from './adminAuth.reducers';


export const selectAdminState = createFeatureSelector<AdminState>('adminState');

// here we are getting the admin{}
export const selectAdmin = createSelector(
  selectAdminState,
  (state) => state.admin
);

// here we are getting the isAdminLogged in state
export const selectIsAdminLoggedIn = createSelector(
  selectAdminState,
  (state) => state.isAdminLoggedIn
);

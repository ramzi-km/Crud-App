import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from 'src/app/interfaces/user.model';

export const selectUsers = createFeatureSelector<User[]>('usersState');

export const selectUser = (id: string) => {
  return createSelector(selectUsers, (users: User[]) =>
    users.find((user) => user._id === id)
  );
};

import { createFeatureSelector } from "@ngrx/store";
import { User } from "src/app/interfaces/user.model";

export const selectUsers = createFeatureSelector<User[]>('usersState'); 
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as UsersActions from 'src/app/store/usersState/users.actions';
import * as UsersSelecter from '../../../store/usersState/users.selectors';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  constructor(private store:Store) {
    
  }
  ngOnInit(): void {  
    this.store.dispatch(UsersActions.getUsers());
  }
  users$=this.store.select(UsersSelecter.selectUsers); 

}

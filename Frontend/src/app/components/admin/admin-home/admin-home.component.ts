import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as UsersActions from 'src/app/store/usersState/users.actions';
import Swal from 'sweetalert2';
import * as UsersSelecter from '../../../store/usersState/users.selectors';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(UsersActions.getUsers());
  }
  searchText!: string 
  users$ = this.store.select(UsersSelecter.selectUsers);
  deleteUser(id: string, name: string) {
    Swal.fire({
      title: `Are you sure want to delete  ${name}?`,
      text: 'This action is irreversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(UsersActions.deleteUser({ id }));
        Swal.fire('Deleted!', 'the user has been deleted', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }
}

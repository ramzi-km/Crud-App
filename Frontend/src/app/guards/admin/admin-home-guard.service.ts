import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import * as adminAuthSelector from '../../store/adminAuth/adminAuth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AdminHomeGuardService implements CanActivate {
  isAdminLoggedIn$ = this.store.pipe(
    select(adminAuthSelector.selectIsAdminLoggedIn)
  );
  value: boolean = false;
  constructor(private store: Store, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    this.isAdminLoggedIn$.subscribe({
      next: (value) => {
        this.value = value;
      },
    });
    if (this.value) {
      return true;
    } else {
      this.router.navigate(['adminLogin']);
      return false;
    }
  }
}

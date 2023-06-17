import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Emitters } from 'src/app/emitters/emitters';

@Injectable({
  providedIn: 'root',
})
export class UserLoginGuardService implements CanActivate {
  isLoggedIn = localStorage.getItem('isLoggedIn') == 'true' ? true : false;
  constructor(private router: Router) {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.isLoggedIn =
        localStorage.getItem('isLoggedIn') == 'true' ? true : false;
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (!this.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}

import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {delay, map, tap} from "rxjs/operators";
import {AuthService} from "../service/auth.service";
import {UserService} from "../service/user.service";
import {TokenBoolean} from "../models/tokenboolean";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private userService: UserService, private router: Router,private authService: AuthService) {
  }

  // @ts-ignore
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    if(this.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  isAuthenticated() {
    console.log(this.authService.isExpired());
    return this.userService.getToken() !== "" || this.userService.getToken() !== null;
  }

}

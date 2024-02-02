import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Token} from "../models/token";
import {tap} from "rxjs/operators";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string;

  constructor(private http: HttpClient,private router: Router) {
    this.baseUrl = environment.baseUrl;
  }
  login(username: string,password: string){
    return this.http.post<Token>(this.baseUrl+"/auth/login", {
      username: username,
      password: password
    }).pipe(
      tap(response => {
        this.handleAuthentication(response.token)
      })
    )
  }
  handleAuthentication(token: string) {
    localStorage.setItem("token", token);
  }
}

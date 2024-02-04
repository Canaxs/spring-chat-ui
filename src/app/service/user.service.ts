import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ControlService} from "./control.service";
import {HttpMethod} from "../components/enums/http-method";
import {Username} from "../models/username";


const TOKEN = 'token';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string;

  constructor(private http: HttpClient,private controlService: ControlService) {
    this.baseUrl = environment.baseUrl;
  }

  removeToken() {
    localStorage.removeItem(TOKEN);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN) || "";
  }

  getUsername(): Observable<Username> {
    const url = this.baseUrl + '/user/username';
    const token = this.getToken();
    return this.http.get<Username>(url, {headers: this.getHttpHeaders(token)});
  }

  getHttpHeaders(token: string): HttpHeaders {
    let httpHeaders: HttpHeaders;
    if (token) {
      httpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    } else {
      httpHeaders = new HttpHeaders();
    }
    httpHeaders.append('Content-Type', 'application/json');
    return httpHeaders;
  }
}

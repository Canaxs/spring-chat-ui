import { Injectable } from '@angular/core';


const TOKEN = 'token';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  removeToken() {
    localStorage.removeItem(TOKEN);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN) || "";
  }
}

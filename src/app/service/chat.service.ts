import { Injectable } from '@angular/core';
import {TokenBoolean} from "../models/tokenboolean";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Count} from "../models/count";
import {Observable} from "rxjs";
import {Username} from "../models/username";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl: string;

  constructor(private http: HttpClient,private router: Router) {
    this.baseUrl = environment.baseUrl;
  }

  numberSessions(): Observable<Count>{
    let httpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("token"));
    return this.http.get<Count>(this.baseUrl+"/numberSessions", {headers: httpHeaders})
  }
}

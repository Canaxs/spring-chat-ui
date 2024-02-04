import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {HttpMethod} from "../components/enums/http-method";

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  constructor(private http: HttpClient) { }

  controlService(url: string,token:string,method: HttpMethod, parameterMap: any) {
    let httpHeaders: HttpHeaders;
    if (token) {
      httpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    } else {
      httpHeaders = new HttpHeaders();
    }

    httpHeaders.append('Content-Type', 'application/json');

    let call: any;

    switch (method) {
      case HttpMethod.GET:
        call = this.http.get(url, {headers: httpHeaders});
        break;
      case HttpMethod.POST:
        call = this.http.post(url, parameterMap, {headers: httpHeaders});
        break;
      case HttpMethod.PUT:
        break;
    }

    return call;
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {Token} from "../../models/token";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  rightPanel= false;
  loginUsername: string = "";


  constructor(private AuthService: AuthService,private router: Router) {
  }

  ngOnInit(): void {
  }
  signSwitch(){
    this.rightPanel = !this.rightPanel;
  }
  login(username:string,password: string) {
    let token: Observable<Token>;
    if(username != null && password != null) {
      console.log(username,password);
      token = this.AuthService.login(username,password);
    }
    token.subscribe(response => {
      if(response.token != null) {
        this.router.navigate(['/chat']);
      }
    }, err => {
    })

  }
  register() {
    const username = document.getElementById("registerUsername");
    const password = document.getElementById("registerPassword");
    if(username.innerText != null && password.innerText != null) {

    }
  }

}

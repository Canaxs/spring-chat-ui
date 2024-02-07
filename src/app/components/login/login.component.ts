import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Token} from "../../models/token";
import {MessageBoxService} from "../../service/message-box.service";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  rightPanel= false;
  loginUsername: string = "";


  constructor(private AuthService: AuthService,private router: Router
              ,private messageBox: MessageBoxService,private userService: UserService) {
  }

  ngOnInit(): void {
  }
  signSwitch(){
    this.rightPanel = !this.rightPanel;
  }
  login(username:string,password: string) {
    let token: Observable<Token>;
    try {
      if (username != null && password != null) {
        console.log(username, password);
        token = this.AuthService.login(username, password);
      }
      token.subscribe(response => {
        if (response.token != null) {
          this.messageBox.success("Giriş Başarılı");
          this.router.navigate(['/chat']);
        }
      }, err => {
        this.messageBox.error('Kullanıcı adı veya Şifre hatalı')
      })
    }
    catch (e) {
      this.messageBox.error('Kullanıcı adı veya Şifre hatalı')
    }

  }
  register(username:string,password: string) {
    try {
      if (username != null && password != null) {
        this.userService.createUser(username,password).then(res => {
            this.messageBox.success("Kullanıcı Başarıyla oluşturuldu.");
        },error => {
          this.messageBox.error("Kullanıcı oluşturulurken hata ile karşılaşıldı");
        })
      }
    }
    catch (e) {
      this.messageBox.error("Kullanıcı oluşturulurken hata ile karşılaşıldı");
    }
  }

}

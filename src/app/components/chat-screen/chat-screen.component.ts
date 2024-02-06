import {Component, HostListener, OnDestroy, OnInit,} from '@angular/core';
import {environment} from "../../../environments/environment";
import {UserService} from "../../service/user.service";
declare var SockJS;

import {Stomp, StompHeaders} from "@stomp/stompjs";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

declare interface Message {
  sender: string;
  message: string;
  date: string;
}


@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.scss']
})
export class ChatScreenComponent implements OnInit,OnDestroy{

  messageList: Message[] = [];
  message: Message;
  username = "";
  public stompClient;
  isExpired: boolean;


  constructor(private userService: UserService,private authService: AuthService,private router: Router) {
    this.userService.getUsername().subscribe(res => this.username = res.username)

  }

  ngOnDestroy() {

  }

  ngOnInit(): void {
    this.authService.isExpired().then(res => {
      if(res.isExpired) {
        this.userService.removeToken();
        this.router.navigate(['/login']);
      }
    })
    this.connect();
  }

  connect() {
    let headers = {
      "Authorization":"Bearer "+this.userService.getToken()
    }
    var socket = new SockJS(environment.baseUrl + '/chat');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect(headers, (frame) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/topic', (message) => {
        this.handleReceivedMessage(JSON.parse(message.body));
      },headers);
    });
  }
  handleReceivedMessage(message: any) {
    const clock = new Date();
    this.message = {
      sender: message.sender,
      message: message.message,
      date: clock.getHours().toString()+":"+clock.getMinutes().toString()
    }
    this.messageList.push(this.message);
  }

  sendMessage(chatbox: string) {
    let headers = {
      "Authorization":"Bearer "+this.userService.getToken()
    }
    try {
      this.stompClient.send("/chat", headers,
        JSON.stringify({'sender': this.username, 'message': chatbox}));
    }
    catch (e) {
      this.authService.isExpired().then(res => {
        if(res.isExpired) {
          this.userService.removeToken();
          this.router.navigate(['/login']);
        }
      })
    }
  }
  disconnect() {
    if(this.stompClient != null) {
      this.stompClient.unsubscribe();
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

}

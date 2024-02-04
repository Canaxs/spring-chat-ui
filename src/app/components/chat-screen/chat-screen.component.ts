import {Component, HostListener, OnDestroy, OnInit,} from '@angular/core';
import {environment} from "../../../environments/environment";
import {UserService} from "../../service/user.service";
import {User} from "../../models/user";
import {Username} from "../../models/username";
import {HttpHeaders} from "@angular/common/http";
declare var SockJS;

import {Stomp, StompHeaders} from "@stomp/stompjs";
import {first, take} from "rxjs/operators";
import {Observable} from "rxjs";

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


  constructor(private userService: UserService) {
    this.userService.getUsername().subscribe(res => this.username = res.username)
  }

  ngOnDestroy() {

  }

  ngOnInit(): void {
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
    this.stompClient.send("/chat", headers,
      JSON.stringify({'sender':this.username, 'message':chatbox}));
  }
  disconnect() {
    if(this.stompClient != null) {
      this.stompClient.unsubscribe();
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

}

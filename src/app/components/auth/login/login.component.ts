import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  signUpRight() {
  const container = document.getElementById('container');
  // @ts-ignore
    container.classList.add("right-panel-active");
 }
 signInRight() {
   const container = document.getElementById('container');
   // @ts-ignore
   container.classList.remove("right-panel-active");
  }

  signIn() {

  }

  signUp() {

  }
}

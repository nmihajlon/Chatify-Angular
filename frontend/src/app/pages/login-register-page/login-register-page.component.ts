import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';
import { LoginComponent } from "../../components/login/login.component";

@Component({
  selector: 'app-login-register-page',
  imports: [LoginComponent],
  templateUrl: './login-register-page.component.html',
  styleUrl: './login-register-page.component.css',
  animations: [
    trigger('slideInOut', [
      state('in', style({ 
        width: '50%',
        right: '0'
      })),
      state('out', style({ 
        width: '50%',
        right: '50%'
      })),
      transition('in => out', [
        animate('500ms ease-in-out', keyframes([
          style({ width: '50%', right: '0', offset: 0 }),
          style({ width: '100%', right: '0', offset: 0.5 }),
          style({ width: '50%', right: '50%', offset: 1 }),
        ]))
      ]),
      transition('out => in', [
        animate('500ms ease-in-out', keyframes([
          style({ width: '50%', right: '50%', offset: 0 }),
          style({ width: '100%', right: '0', offset: 0.5 }),
          style({ width: '50%', right: '0', offset: 1 }),
        ]))
      ])
    ])
  ]
})
export class LoginRegisterPageComponent {
  position: 'in' | 'out' = 'in';

  togglePosition() {
    this.position = this.position === 'in' ? 'out' : 'in';
  }
}

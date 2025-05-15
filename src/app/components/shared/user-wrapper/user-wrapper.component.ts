import { Component, input } from '@angular/core';
import { User } from '../../../../model/user.model';

@Component({
  selector: 'app-user-wrapper',
  imports: [],
  templateUrl: './user-wrapper.component.html',
  styleUrl: './user-wrapper.component.css'
})
export class UserWrapperComponent {
  user = input.required<User>();
} 

import { Component, inject, input } from '@angular/core';
import { User } from '../../../../model/user.model';
import { UserService } from '../../../../service/user.service';

@Component({
  selector: 'app-user-wrapper',
  imports: [],
  templateUrl: './user-wrapper.component.html',
  styleUrl: './user-wrapper.component.css',
})
export class UserWrapperComponent {
  user = input.required<User>();
  private userService = inject(UserService);

  addChat() {
    console.log(this.user());
  }
}

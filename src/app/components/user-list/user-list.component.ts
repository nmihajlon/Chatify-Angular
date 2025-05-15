import { Component, inject, OnInit, signal } from '@angular/core';
import { UserWrapperComponent } from "../shared/user-wrapper/user-wrapper.component";
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-list',
  imports: [UserWrapperComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent{
  private userService = inject(UserService);
  users = this.userService.users;
}

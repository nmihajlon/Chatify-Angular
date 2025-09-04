import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { UserWrapperComponent } from "./user-wrapper/user-wrapper.component";

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

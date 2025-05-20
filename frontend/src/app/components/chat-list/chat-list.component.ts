import { Component, inject } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { ChatWrapperComponent } from "./chat-wrapper/chat-wrapper.component";

@Component({
  selector: 'app-chat-list',
  imports: [  ChatWrapperComponent],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css'
})
export class ChatListComponent {
  private userService = inject(UserService);
  users = this.userService.users;
}

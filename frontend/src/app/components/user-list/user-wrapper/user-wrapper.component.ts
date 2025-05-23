import { Component, inject, input } from '@angular/core';
import { User } from '../../../../model/user.model';
import { ChatService } from '../../../../service/chat.service';
import { SocketService } from '../../../../service/socket.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-wrapper',
  imports: [],
  templateUrl: './user-wrapper.component.html',
  styleUrl: './user-wrapper.component.css',
})
export class UserWrapperComponent {
  user = input.required<User>();
  private chatService = inject(ChatService);

  addChat() {
    this.chatService.addChat(this.user()._id);
  }
}

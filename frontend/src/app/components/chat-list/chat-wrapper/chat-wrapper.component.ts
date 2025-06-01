import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { UserService } from '../../../../service/user.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Chat } from '../../../../model/chat.model';
import { AuthService } from '../../../../service/auth.service';
import { User } from '../../../../model/user.model';
import { SocketService } from '../../../../service/socket.service';
import { ChatService } from '../../../../service/chat.service';

@Component({
  selector: 'app-chat-wrapper',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './chat-wrapper.component.html',
  styleUrl: './chat-wrapper.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWrapperComponent {
  private userService = inject(UserService);  
  private socketService = inject(SocketService);
  private chatService = inject(ChatService);
  private authService = inject(AuthService);

  chat = input.required<Chat>();
  user = signal<User | null>(null);
  loggedUser = signal<User | null | undefined>(null);

  ngOnInit() {
    console.log(this.chat());
    this.authService.currentUser$.subscribe(user => {
      this.loggedUser.set(user);
      this.updateOtherUser();
    });
  }
  
  updateOtherUser() {
    const user = this.loggedUser();
    const chat = this.chat();
    if (user && chat) {
      const otherUsers = chat.users.filter(u => u._id !== user._id);
      this.user.set(otherUsers.length > 0 ? otherUsers[0] : null);
    }
  }

  selectUser(){
    this.chatService.setSelectedChat(this.chat());
  }
}

import { Component, computed, inject, signal } from '@angular/core';
import { ChatHeaderComponent } from "./chat-header/chat-header.component";
import { ChatBodyComponent } from './chat-body/chat-body.component';
import { ChatFooterComponent } from './chat-footer/chat-footer.component';
import { User } from '../../../model/user.model';
import { ChatService } from '../../../service/chat.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-chat-area',
  imports: [ChatHeaderComponent, ChatBodyComponent, ChatFooterComponent],
  templateUrl: './chat-area.component.html',
  styleUrl: './chat-area.component.css',
  host: {
    class: 'relative'
  }
})
export class ChatAreaComponent {
  private authService = inject(AuthService);
  chatId = signal<string | null>('');
  loggedUser = signal<User | null | undefined>(null);
  private chatService = inject(ChatService);
  chat = this.chatService.getSelectedChat;
  
  selectedUser = computed<User | null>(() => {
    const currentChat = this.chat();
    if (!currentChat || currentChat.isGroupChat) return null;
    return currentChat.users[0];
  });
  
  selectedUsers = computed<User[] | null>(() => {
    const currentChat = this.chat();
    if (!currentChat || !currentChat.isGroupChat) return null;
    return currentChat.users;
  });
  

  ngOnInit(){
    this.authService.currentUser$.subscribe({
      next: (user) => {
        this.loggedUser.set(user);
      },
    });
  }

}

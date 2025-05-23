import { Component, inject, signal } from '@angular/core';
import { ChatWrapperComponent } from "./chat-wrapper/chat-wrapper.component";
import { ChatService } from '../../../service/chat.service';
import { Chat } from '../../../model/chat.model';
import { SocketService } from '../../../service/socket.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-chat-list',
  imports: [ ChatWrapperComponent ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css'
})
export class ChatListComponent {
  private chatService = inject(ChatService);
  private socketService = inject(SocketService);
  private userService = inject(UserService);
  chats: Chat[] = [];

  ngOnInit(){
    this.chatService.getChatList().subscribe({
      next: (response : any) => {
        this.chats = response;
      }
    });

    this.socketService.onChatAdd().subscribe((chat) => {
      console.log('Novi chat primljen preko socket-a:', chat);
      this.chats = [chat, ...this.chats];
      this.userService.loadUsers();
    });
    
  }
}

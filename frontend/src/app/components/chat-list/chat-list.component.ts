import { Component, inject, signal } from '@angular/core';
import { ChatWrapperComponent } from "./chat-wrapper/chat-wrapper.component";
import { ChatService } from '../../../service/chat.service';
import { Chat } from '../../../model/chat.model';

@Component({
  selector: 'app-chat-list',
  imports: [ ChatWrapperComponent ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css'
})
export class ChatListComponent {
  private chatService = inject(ChatService);
  chats: Chat[] = [];

  ngOnInit(){
    this.chatService.getChatList().subscribe({
      next: (response : any) => {
        this.chats = response;
      }
    });
  }
}

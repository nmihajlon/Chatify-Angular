import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { User } from '../../../../model/user.model';
import { MessageService } from '../../../../service/message.service';
import { Message } from '../../../../model/message.model';
import { ChatService } from '../../../../service/chat.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-chat-body',
  templateUrl: './chat-body.component.html',
  styleUrl: './chat-body.component.css',
  standalone: true,
  imports: [NgIf, NgFor]
})
export class ChatBodyComponent {
  private messageService = inject(MessageService);
  private chatService = inject(ChatService);

  loggedUser = input.required<User | null | undefined>();
  messages = signal<Message[] | null>(null);

  chat = this.chatService.getSelectedChat;

  selectedUser = computed<User | null>(() => {
    const currentChat = this.chat();
    if (!currentChat || currentChat.isGroupChat) return null;
    return currentChat.users[0];
  });

  constructor() {
    effect(() => {
      if (this.selectedUser()?._id) {
        this.messageService.getMessages(this.chat()!._id).subscribe({
          next: (msgs) => this.messages.set(msgs),
          error: (err) => console.error(err)
        });
      } else {
        this.messages.set(null);
      }
    });
  }
}

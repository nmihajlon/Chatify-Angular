import { Component, inject, input, signal } from '@angular/core';
import { User } from '../../../../model/user.model';
import { MessageService } from '../../../../service/message.service';
import { Message } from '../../../../model/message.model';
import { ChatService } from '../../../../service/chat.service';

@Component({
  selector: 'app-chat-body',
  imports: [],
  templateUrl: './chat-body.component.html',
  styleUrl: './chat-body.component.css'
})
export class ChatBodyComponent {
  private messageService = inject(MessageService);
  private chatService = inject(ChatService);

  loggedUser = input.required<User | null | undefined>();
  messages = signal<Message[] | null>(null);

  get chatId() {
    return this.chatService.selectedChatId();
  }

  ngOnInit() {
    if (this.chatId !== null) {
      this.messageService.getMessages(this.chatId).subscribe({
        next: (msgs) => this.messages.set(msgs),
        error: (err) => console.error(err)
      });
    }
  }
}

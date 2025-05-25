import { Component, inject, input, signal } from '@angular/core';
import { User } from '../../../../model/user.model';
import { MessageService } from '../../../../service/message.service';
import { Message } from '../../../../model/message.model';

@Component({
  selector: 'app-chat-body',
  imports: [],
  templateUrl: './chat-body.component.html',
  styleUrl: './chat-body.component.css'
})
export class ChatBodyComponent {
  private messageService = inject(MessageService);

  selectedUser = input.required<User | null | undefined>();
  chatId = input.required<string | null>();

  messages = signal<Message[] | null>(null);

  ngOnInit(){
    if(this.chatId() !== null){
      this.messageService.getMessages(this.chatId()!).subscribe({

      })
    }
  }
}

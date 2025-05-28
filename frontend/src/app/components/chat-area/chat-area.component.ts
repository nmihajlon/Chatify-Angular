import { Component, inject, signal } from '@angular/core';
import { ChatHeaderComponent } from "./chat-header/chat-header.component";
import { ChatBodyComponent } from './chat-body/chat-body.component';
import { ChatFooterComponent } from './chat-footer/chat-footer.component';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../model/user.model';
import { ChatService } from '../../../service/chat.service';

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
  private activatedRoute = inject(ActivatedRoute);
  private chatService = inject(ChatService);
  chatId = signal<string | null>('');
  selectedUser = signal<User | null | undefined>(null);

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.chatId.set(params.get('userId'));
        this.selectedUser.set(this.chatService.getSelectedUser(this.chatId()));
      }
    })
  }

}

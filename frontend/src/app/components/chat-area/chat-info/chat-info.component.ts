import { Component, inject } from '@angular/core';
import { ChatInfoService } from '../../../../service/chat-info.service';

@Component({
  selector: 'app-chat-info',
  imports: [],
  templateUrl: './chat-info.component.html',
  styleUrl: './chat-info.component.css'
})
export class ChatInfoComponent {
  private chatInfoService = inject(ChatInfoService);

  closeChat(){
    this.chatInfoService.setShowUserInfo(false);
  }
}

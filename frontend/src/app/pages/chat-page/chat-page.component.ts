import { Component, inject } from '@angular/core';
import { ChatAreaComponent } from "../../components/chat-area/chat-area.component";
import { ChatInfoService } from '../../../service/chat-info.service';
import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';
import { ChatInfoComponent } from "../../components/chat-area/chat-info/chat-info.component";

@Component({
  selector: 'app-chat-page',
  imports: [ChatAreaComponent, ChatInfoComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css',
  host: {
    class: 'flex flex-1 overflow-x-hidden'
  },
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ width: '0', opacity: 0 }),
        animate('300ms ease-out', style({ width: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ width: '0', opacity: 0 }))
      ])
    ])
  ]
})
export class ChatPageComponent {
  private chatInfoService = inject(ChatInfoService);
  chatInfo = this.chatInfoService.showChatInfo;
}

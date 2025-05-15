import { Component } from '@angular/core';
import { ChatHeaderComponent } from "./chat-header/chat-header.component";

@Component({
  selector: 'app-chat-area',
  imports: [ChatHeaderComponent],
  templateUrl: './chat-area.component.html',
  styleUrl: './chat-area.component.css'
})
export class ChatAreaComponent {

}

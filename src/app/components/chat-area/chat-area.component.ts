import { Component } from '@angular/core';
import { ChatHeaderComponent } from "./chat-header/chat-header.component";
import { ChatBodyComponent } from './chat-body/chat-body.component';
import { ChatFooterComponent } from './chat-footer/chat-footer.component';

@Component({
  selector: 'app-chat-area',
  imports: [ChatHeaderComponent, ChatBodyComponent, ChatFooterComponent],
  templateUrl: './chat-area.component.html',
  styleUrl: './chat-area.component.css'
})
export class ChatAreaComponent {

}

import { Component } from '@angular/core';
import { ChatAreaComponent } from "../../components/chat-area/chat-area.component";
import { UserInfoComponent } from "../../components/user-info/user-info.component";

@Component({
  selector: 'app-chat-page',
  imports: [ChatAreaComponent, UserInfoComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css',
  host: {
    class: 'flex flex-1'
  }
})
export class ChatPageComponent {

}

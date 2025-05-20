import { Component, input } from '@angular/core';
import { User } from '../../../../model/user.model';

@Component({
  selector: 'app-chat-body',
  imports: [],
  templateUrl: './chat-body.component.html',
  styleUrl: './chat-body.component.css'
})
export class ChatBodyComponent {
  selectedUser = input.required<User | null | undefined>();
}

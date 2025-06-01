import { Component, inject, input, OnInit, signal } from '@angular/core';
import { UserService } from '../../../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../model/user.model';
import { ChatInfoService } from '../../../../service/chat-info.service';
import { Chat } from '../../../../model/chat.model';

@Component({
  selector: 'app-chat-header',
  imports: [],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.css'
})
export class ChatHeaderComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private chatInfoService = inject(ChatInfoService);
  selectedUser = input.required<User | null | undefined>();

  closeChat(){
    // this.userService.setSelectedUser(null);
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  openChatInfo(){
    this.chatInfoService.toggleUserInfo();
  }
}

import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../model/user.model';
import { ChatInfoService } from '../../../../service/chat-info.service';

@Component({
  selector: 'app-chat-header',
  imports: [],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.css'
})
export class ChatHeaderComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private chatInfoService = inject(ChatInfoService);
  
  loggedUser = input.required<User | null | undefined>();
  selectedUser = input.required<User | null | undefined>();

  closeChat(){
    // this.userService.setSelectedUser(null);
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  openChatInfo(){
    this.chatInfoService.toggleUserInfo();
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }
}

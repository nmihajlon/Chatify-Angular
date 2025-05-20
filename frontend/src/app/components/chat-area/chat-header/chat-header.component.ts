import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../../../service/user.service';
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
  private userService = inject(UserService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private chatInfoService = inject(ChatInfoService);
  userId = signal<string | null>('');
  selectedUser = signal<User | null | undefined>(null);

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.userId.set(params.get('userId'));
        this.selectedUser.set(this.userService.getUser(this.userId()));
        console.log(this.selectedUser());
      }
    })
  }

  closeChat(){
    this.userService.setSelectedUser(null);
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  openChatInto(){
    this.chatInfoService.toggleUserInfo();
  }
}

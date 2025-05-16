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
  user = signal<User | null | undefined>(null);

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.userId.set(params.get('userId'));
        this.user.set(this.userService.getUser(this.userId()));
      }
    })
  }

  closeChat(){
    this.userService.setSelectedUser(null);
    this.router.navigate(['../'])
  }

  openChatInto(){
    this.chatInfoService.toggleUserInfo();
  }
}

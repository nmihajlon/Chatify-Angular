import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ChatWrapperComponent } from "./chat-wrapper/chat-wrapper.component";
import { ChatService } from '../../../service/chat.service';
import { Chat } from '../../../model/chat.model';
import { SocketService } from '../../../service/socket.service';
import { UserService } from '../../../service/user.service';
import { AuthService } from '../../../service/auth.service';
import { User } from '../../../model/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  imports: [ ChatWrapperComponent ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css'
})
export class ChatListComponent {
  private chatService = inject(ChatService);
  private socketService = inject(SocketService);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private activatedRouter = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);  

  chats: Chat[] = [];
  loggedUser = signal<User | null | undefined >(null);

  ngOnInit(){
    const sub1 = this.authService.currentUser$.subscribe({
      next: user => {
        this.loggedUser.set(user);
      }
    })

    const sub2 = this.chatService.getChatList().subscribe({
      next: (response : any) => {
        console.log(response);
        this.chats = response;
        let users = this.chats.map(chat => chat.users).flat();
        const childRoute = this.activatedRouter.firstChild;
        const userId = childRoute?.snapshot.paramMap.get('userId') ?? null;
        const user = this.userService.getUser(users, userId);
        this.userService.setSelectedUser(user);
      }
    });

    const sub3 = this.socketService.onChatAdd().subscribe((chat) => {
      this.chats = [chat, ...this.chats];
      this.userService.loadUsers().subscribe();
    });
    
    this.destroyRef.onDestroy(() => {
      sub1.unsubscribe();
      sub2.unsubscribe();
      sub3.unsubscribe();
    })
  }
}

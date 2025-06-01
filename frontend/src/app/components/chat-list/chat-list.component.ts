import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ChatWrapperComponent } from './chat-wrapper/chat-wrapper.component';
import { ChatService } from '../../../service/chat.service';
import { Chat } from '../../../model/chat.model';
import { SocketService } from '../../../service/socket.service';
import { UserService } from '../../../service/user.service';
import { AuthService } from '../../../service/auth.service';
import { User } from '../../../model/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  imports: [ChatWrapperComponent],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css',
})
export class ChatListComponent {
  private chatService = inject(ChatService);
  private socketService = inject(SocketService);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private activatedRouter = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  chats = signal<Chat[]>([]);
  selectedChat = signal<Chat | null>(null);
  loggedUser = signal<User | null | undefined>(null);

  ngOnInit() {
    const sub1 = this.authService.currentUser$.subscribe({
      next: (user) => {
        this.loggedUser.set(user);
      },
    });

    const sub2 = this.chatService.getChatList().subscribe({
      next: (_) => {
        this.chats.set(this.chatService.chats());
    
        if (this.selectedChat() === null) {
          this.activatedRouter.firstChild?.paramMap.subscribe({
            next: (params) => {
              const chatId = params.get('chatId');
              if (chatId) {
                const chat = this.chatService.getSelectedChatById(chatId);
                this.chatService.setSelectedChat(chat);
                this.selectedChat.set(chat);
              } else {
                this.selectedChat.set(null);
              }
            },
          });
        }
      },
    });

    const sub3 = this.socketService.onChatAdd().subscribe((chat) => {
      this.chats.update((prevChats) => {
        return [...prevChats, chat];
      });
      this.userService.loadUsers().subscribe();
    });

    this.destroyRef.onDestroy(() => {
      sub1.unsubscribe();
      sub2.unsubscribe();
      sub3.unsubscribe();
    });
  }
}

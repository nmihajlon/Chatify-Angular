import { Component, inject, input, signal } from '@angular/core';
import { UserService } from '../../../../service/user.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Chat } from '../../../../model/chat.model';
import { AuthService } from '../../../../service/auth.service';
import { User } from '../../../../model/user.model';
import { SocketService } from '../../../../service/socket.service';

@Component({
  selector: 'app-chat-wrapper',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './chat-wrapper.component.html',
  styleUrl: './chat-wrapper.component.css'
})
export class ChatWrapperComponent {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private socketService = inject(SocketService);

  chat = input.required<Chat>();
  user = signal<User | null>(null);

  ngOnInit(){
    this.authService.currentUser$.subscribe({
      next: (user) => {
        const pom = this.chat().users.filter((chat) => chat._id !== user?._id)
        this.user.set(pom[0]);
      }
    });

    this.socketService.onUserStatusChanged()
          .subscribe(status => {
            this.user.update((prevUser) => {
              if (prevUser && prevUser._id === status.userId) {
                return { ...prevUser, isOnline: status.isOnline };
              }
              return prevUser;
            })
          });
  }

  selectUser(){
    this.userService.setSelectedUser(this.user());
  }
}

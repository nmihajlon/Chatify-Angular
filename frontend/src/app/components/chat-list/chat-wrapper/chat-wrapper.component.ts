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
  private socketService = inject(SocketService);

  chat = input.required<Chat>();
  loggedUser = input.required<User | null | undefined>();
  user = signal<User | null>(null);

  ngOnInit(){
    const pom = this.chat().users.filter(u => u._id !== this.loggedUser()?._id);
    this.user.set(pom[0]);

    // this.socketService.onUserStatusChanged()
    //       .subscribe(status => {
    //         this.user.update((prevUser) => {
    //           if (prevUser && prevUser._id === status.userId) {
    //             return { ...prevUser, isOnline: status.isOnline };
    //           }
    //           return prevUser;
    //         })
    //       });
  }

  selectUser(){
    this.userService.setSelectedUser(this.user());
  }
}

import { Component, inject, input, signal } from '@angular/core';
import { UserService } from '../../../../service/user.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Chat } from '../../../../model/chat.model';
import { AuthService } from '../../../../service/auth.service';
import { User } from '../../../../model/user.model';

@Component({
  selector: 'app-chat-wrapper',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './chat-wrapper.component.html',
  styleUrl: './chat-wrapper.component.css'
})
export class ChatWrapperComponent {
  chat = input.required<Chat>();
  private userService = inject(UserService);
  private authService = inject(AuthService);
  user = signal<User | null>(null);
  
  ngOnInit(){
    this.authService.currentUser$.subscribe({
      next: (user) => {
        const pom = this.chat().users.filter((chat) => chat._id !== user?._id)
        this.user.set(pom[0]);
      }
    });
  }

  selectUser(){
    this.userService.setSelectedUser(this.user());
    // this.router.navigate(['./', this.user().id])
  }
}

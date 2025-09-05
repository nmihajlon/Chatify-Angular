import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { UserListComponent } from "../user-list/user-list.component";
import { Router } from '@angular/router';
import { ChatListComponent } from "../chat-list/chat-list.component";
import { ChatService } from '../../../service/chat.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-sidebar',
  imports: [SearchBarComponent, UserListComponent, ChatListComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private router = inject(Router);
  private chatService = inject(ChatService);
  private userService = inject(UserService);
  searchTerm = signal<string>('');

  ngOnInit(): void {
    this.chatService.getChatList().subscribe({
      next: () => {
        console.log('Chatovi učitani u Sidebaru:', this.chatService.chats());
      }
    });
  }

  availableUsersCount = computed(() => this.userService.users().length);

  availableChatsCount = computed(() => {
    console.log(this.chatService.chats());
    return this.chatService.chats().reduce((acc, chat) => acc + chat.users.length, 0)
  });
  
  navigateHome(){
    this.chatService.setSelectedChat(null);
    this.router.navigate(['']);
  }

  onSearchChanged(term: string) {
    this.searchTerm.set(term);
  }
}

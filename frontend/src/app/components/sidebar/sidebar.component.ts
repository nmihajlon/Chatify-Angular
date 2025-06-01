import { Component, inject } from '@angular/core';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { UserListComponent } from "../user-list/user-list.component";
import { Router } from '@angular/router';
import { ChatListComponent } from "../chat-list/chat-list.component";
import { ChatService } from '../../../service/chat.service';

@Component({
  selector: 'app-sidebar',
  imports: [SearchBarComponent, UserListComponent, ChatListComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private router = inject(Router);
  private chatService = inject(ChatService);
  
  navigateHome(){
    this.chatService.setSelectedChat(null);
    this.router.navigate(['']);
  }
}

import { Component, inject } from '@angular/core';
import { UserService } from '../../../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-header',
  imports: [],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.css'
})
export class ChatHeaderComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  closeChat(){
    this.userService.setSelectedUser(null);
    this.router.navigate(['../'])
  }
}

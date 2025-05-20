import { Component, inject, input } from '@angular/core';
import { UserService } from '../../../../service/user.service';
import { User } from '../../../../model/user.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-chat-wrapper',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './chat-wrapper.component.html',
  styleUrl: './chat-wrapper.component.css'
})
export class ChatWrapperComponent {
  user = input.required<User>();
  private userService = inject(UserService);


  selectUser(){
    this.userService.setSelectedUser(this.user());
    // this.router.navigate(['./', this.user().id])
  }
}

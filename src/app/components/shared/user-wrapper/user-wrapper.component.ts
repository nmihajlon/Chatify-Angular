import { Component, inject, input } from '@angular/core';
import { User } from '../../../../model/user.model';
import { UserService } from '../../../../service/user.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user-wrapper',
  templateUrl: './user-wrapper.component.html',
  styleUrl: './user-wrapper.component.css',
  imports: [RouterLink, RouterLinkActive]
})
export class UserWrapperComponent {
  user = input.required<User>();
  private userService = inject(UserService);
  private router = inject(Router);

  selectUser(){
    this.userService.setSelectedUser(this.user());
    // this.router.navigate(['./', this.user().id])
  }
} 

import { Component, inject } from '@angular/core';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { UserListComponent } from "../user-list/user-list.component";
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-sidebar',
  imports: [SearchBarComponent, UserListComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  
  navigateHome(){
    this.userService.setSelectedUser(null);
    this.router.navigate(['']);
  }
}

import { Component, inject, signal } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { EmptyScreenComponent } from '../../components/empty-screen/empty-screen.component';

@Component({
  selector: 'app-home-page',
  imports: [SidebarComponent, RouterOutlet, EmptyScreenComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  private userService = inject(UserService);
  private activatedRouter = inject(ActivatedRoute);
  selectedUser = this.userService.selectedUser;


  ngOnInit() {
    this.userService.loadUsers();
  
    const childRoute = this.activatedRouter.firstChild;
    const userId = childRoute?.snapshot.paramMap.get('userId') ?? null;
    const user = this.userService.getUser(userId);
    this.userService.setSelectedUser(user);
  }
  
}

import { Component, inject, signal } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
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
  selectedUser = this.userService.selectedUser;


  ngOnInit(){
    this.userService.loadUsers();
  }
}

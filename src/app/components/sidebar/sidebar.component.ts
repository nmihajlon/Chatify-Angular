import { Component } from '@angular/core';
import { UserWrapperComponent } from "../shared/user-wrapper/user-wrapper.component";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { UserListComponent } from "../user-list/user-list.component";

@Component({
  selector: 'app-sidebar',
  imports: [SearchBarComponent, UserListComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}

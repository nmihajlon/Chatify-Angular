import { Component } from '@angular/core';
import { UserWrapperComponent } from "../shared/user-wrapper/user-wrapper.component";
import { SearchBarComponent } from "../search-bar/search-bar.component";

@Component({
  selector: 'app-sidebar',
  imports: [UserWrapperComponent, SearchBarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}

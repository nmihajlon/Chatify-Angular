import { Component } from '@angular/core';
import { UserWrapperComponent } from "../../components/shared/user-wrapper/user-wrapper.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { ChatAreaComponent } from "../../components/chat-area/chat-area.component";
import { UserInfoComponent } from "../../components/user-info/user-info.component";

@Component({
  selector: 'app-home-page',
  imports: [SidebarComponent, ChatAreaComponent, UserInfoComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}

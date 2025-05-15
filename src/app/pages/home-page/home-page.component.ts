import { Component } from '@angular/core';
import { UserWrapperComponent } from "../../components/shared/user-wrapper/user-wrapper.component";

@Component({
  selector: 'app-home-page',
  imports: [UserWrapperComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}

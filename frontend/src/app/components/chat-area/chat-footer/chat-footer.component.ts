import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../service/auth.service';
import { User } from '../../../../model/user.model';

@Component({
  selector: 'app-chat-footer',
  imports: [],
  templateUrl: './chat-footer.component.html',
  styleUrl: './chat-footer.component.css'
})
export class ChatFooterComponent {
  private authService = inject(AuthService);
  loggedUser! : User;

  ngOnInit(){
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.loggedUser = user;
      }
    })
  }
}

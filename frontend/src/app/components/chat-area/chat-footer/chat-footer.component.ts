import { Component, inject, input, signal } from '@angular/core';
import { AuthService } from '../../../../service/auth.service';
import { User } from '../../../../model/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-footer',
  imports: [FormsModule],
  templateUrl: './chat-footer.component.html',
  styleUrl: './chat-footer.component.css'
})
export class ChatFooterComponent {
  private authService = inject(AuthService);
  loggedUser! : User;
  selectedUser = input.required<User | null | undefined>();
  message = signal<string>('');

  ngOnInit(){
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.loggedUser = user;
      }
    })
  }

  sendMessage(){    
    this.message.set('');
  }
}

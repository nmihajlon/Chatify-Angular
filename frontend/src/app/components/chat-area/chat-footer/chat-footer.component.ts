import { Component, inject, input, signal } from '@angular/core';
import { AuthService } from '../../../../service/auth.service';
import { User } from '../../../../model/user.model';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../../../service/message.service';

@Component({
  selector: 'app-chat-footer',
  imports: [FormsModule],
  templateUrl: './chat-footer.component.html',
  styleUrl: './chat-footer.component.css',
})
export class ChatFooterComponent {
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  loggedUser!: User | undefined | null;
  selectedUser = input.required<User | null | undefined>();
  message = signal<string>('');
  chatId = input.required<string | null>();

  ngOnInit() {
    this.authService.currentUser$.subscribe({
      next: (user) => {
        this.loggedUser = user;
      },
    });
  }

  sendMessage() {
    const content = this.message();
    const currentChatId = this.chatId();

    if (!content.trim() || !currentChatId) return;

    this.messageService.send(currentChatId, content).subscribe({
      next: () => {
        this.message.set('');
      },
      error: (err) => {
        console.error('Greška prilikom slanja poruke:', err);
      },
    });
  }
}

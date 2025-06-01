import { Component, inject, input, signal } from '@angular/core';
import { AuthService } from '../../../../service/auth.service';
import { User } from '../../../../model/user.model';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../../../service/message.service';
import { ChatService } from '../../../../service/chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-footer',
  imports: [FormsModule],
  templateUrl: './chat-footer.component.html',
  styleUrl: './chat-footer.component.css',
})
export class ChatFooterComponent {
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private chatService = inject(ChatService);
  private activatedRoute = inject(ActivatedRoute);

  loggedUser!: User | undefined | null;
  message = signal<string>('');
  chat = this.chatService.getSelectedChat;

  ngOnInit() {
    this.authService.currentUser$.subscribe({
      next: (user) => {
        this.loggedUser = user;
      },
    });
  } 

  sendMessage() {
    const content = this.message();
    const currentChat = this.chat();

    if(currentChat === null && !content.trim()) return;

    console.log(this.chat());

    if (currentChat!.isGroupChat) {
      console.log('Ovo je grupni chat');
    } else {
      const recieverUser = currentChat!.users[0];
      console.log(recieverUser);
      this.messageService.send(recieverUser._id, currentChat!._id, content).subscribe({
        next: () => {
          this.message.set('');
        },
        error: (err) => {
          console.error('Greška prilikom slanja poruke:', err);
        },
      });
    }

  }
}

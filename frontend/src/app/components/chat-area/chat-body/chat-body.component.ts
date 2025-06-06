import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import { User } from '../../../../model/user.model';
import { MessageService } from '../../../../service/message.service';
import { Message } from '../../../../model/message.model';
import { ChatService } from '../../../../service/chat.service';
import { NgFor, NgIf } from '@angular/common';
import { SocketService } from '../../../../service/socket.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-chat-body',
  templateUrl: './chat-body.component.html',
  styleUrl: './chat-body.component.css',
  standalone: true,
  imports: [NgIf, NgFor],
})
export class ChatBodyComponent {
  private messageService = inject(MessageService);
  private socketService = inject(SocketService);
  private chatService = inject(ChatService);
  private destroy$ = new Subject<void>();
  @ViewChild('scrollBottom') scrollBottom!: ElementRef;

  loggedUser = input.required<User | null | undefined>();
  messages = this.messageService.messages;

  chat = this.chatService.getSelectedChat;

  selectedUser = computed<User | null>(() => {
    const currentChat = this.chat();
    if (!currentChat || currentChat.isGroupChat) return null;
    return currentChat.users[0];
  });

  constructor() {
    // Efekat za fetch i skrolovanje nakon menjanja selektovanog korisnika
    effect(() => {
      if (this.selectedUser()?._id) {
        this.messageService.getMessages(this.chat()!._id).subscribe({
          next: () => {
            this.scrollToBottom();
          },
          error: (err) => console.error(err),
        });
      } else {
        this.messageService.clearMessages();
      }
    });

    effect(() => {
      this.messages();
      this.scrollToBottom();
    });
  }

  ngOnInit() {
    this.socketService
      .onNewMessage()
      .pipe(takeUntil(this.destroy$))
      .subscribe((message) => {
        console.log('New message received:', message);
        this.messageService.addMessage(message);
        this.scrollToBottom();
      });
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    try {
      setTimeout(() => {
        this.scrollBottom.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    } catch (err) {
      console.error('Scroll to bottom failed', err);
    }
  }
}

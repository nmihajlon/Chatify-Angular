import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../environtment/environment.develop';
import { Chat } from '../model/chat.model';
import { tap } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private httpClient = inject(HttpClient);
  private _chats = signal<Chat[]>([]);
  private _selectedChat = signal<Chat | null>(null);
  private _selectedChatId = signal<string | null>(null);

  get chats() {
    return this._chats.asReadonly();
  }

  get selectedChatId() {
    return this._selectedChatId.asReadonly();
  }

  getSelectedUser(userId: string | null) : User | null {
    if (userId === null) return null;
  
    const chats = this._chats();
    if (!chats) return null;
  
    for (const chat of chats) {
      const user = chat.users.find((user: User) => user._id === userId);
      if (user) {
        return user;
      }
    }
  
    return null;
  }

  getChatList() {
    return this.httpClient
      .get(`${environment.apiUrl}chats`, {
        withCredentials: true,
      })
      .pipe(tap({ next: (response : any) => {
        this._chats.set(response)
      } }));
  }

  addChat(selectedUserId: string) {
    this.httpClient
      .post(
        `${environment.apiUrl}chats/private`,
        { userId: selectedUserId },
        { withCredentials: true }
      )
      .subscribe();
  }

  setSelectedChat(user: Chat | null) {
    this._selectedChat.set(user);
  }

  setSelectedChatId(chatId: string | null) {
    this._selectedChatId.set(chatId);
  }
}

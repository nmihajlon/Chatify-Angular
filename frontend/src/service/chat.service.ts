import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../environtment/environment.develop';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private httpClient = inject(HttpClient);

  getChatList() {
    return this.httpClient.get(`${environment.apiUrl}chats`, {
      withCredentials: true,
    });
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
}

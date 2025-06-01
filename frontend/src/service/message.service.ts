import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Message } from '../model/message.model';
import { environment } from '../environtment/environment.develop';
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private httpClient = inject(HttpClient);
  private _messages = signal<Message[]>([]);

  get messages() {
    return this._messages.asReadonly();
  }

  getMessages(chatId: string): Observable<Message[]> {
    return this.httpClient
      .get<Message[]>(`${environment.apiUrl}messages/${chatId}`, {
        withCredentials: true,
      })
      .pipe(
        tap({
          next: (response: Message[]) => {
            this._messages.set(response);
          },
        })
      );
  }

  send(selectedUserId : string, chatId: string, content: string): Observable<Message> {
    console.log(selectedUserId, chatId, content);
    return this.httpClient
      .post<Message>(
        `${environment.apiUrl}messages`,
        { userId: selectedUserId, chatId, content },
        { withCredentials: true }
      )
      .pipe(
        tap({
          next: (newMessage: Message) => {
            this._messages.update((prev) => [...prev, newMessage]);
          },
        })
      );
  }
}

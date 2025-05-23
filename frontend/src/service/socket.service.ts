import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Chat } from '../model/chat.model';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket | null = null;

  private readonly SOCKET_URL = 'http://localhost:8000';

  // Proverava da li je konektovan
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  // Inicira konekciju ako nije već konektovan
  connect() {
    if (!this.socket || !this.socket.connected) {
      this.socket = io(this.SOCKET_URL, {
        withCredentials: true,
      });
    }
  }

  // Poziva se nakon sto se uspesno ulogujem
  joinRoom(userId: string) {
    this.connect(); // pobrini se da je konektovan
    this.socket?.emit('joinRoom', userId);
  }

  // Slusa listu dostupnih korisnika za chat-ovanje
  onAvailableListUpdated(): Observable<string[]> {
    return new Observable((observer) => {
      this.socket?.on('availableListUpdated', (users: string[]) => {
        observer.next(users);
      });
    });
  }

  // Slusa na promene statusa korisnika
  onUserStatusChanged(): Observable<{ userId: string; isOnline: boolean }> {
    return new Observable((observer) => {
      this.socket?.on('userStatusChanged', (data) => {
        observer.next(data);
      });
    });
  }

  // Slusa promene dodavanja novog chat-a
  onChatAdd(): Observable<Chat> {
    return new Observable((observer) => {
      this.socket?.on('newChat', (chat: Chat) => {
        observer.next(chat);
      });
    });
  }

  // Gasi konekciju, poziva se npr. prilikom logouta
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

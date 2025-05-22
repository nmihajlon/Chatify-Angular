import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:8000', {
      withCredentials: true,
    });
  }

  joinRoom(userId: string) {
    this.socket.emit('joinRoom', userId);
  }

  onAvailableListUpdated(): Observable<string[]> {
    return new Observable((observer) => {
      this.socket.on('availableListUpdated', (users: string[]) => {
        observer.next(users);
      });
    });
  }

  onUserStatusChanged(): Observable<{ userId: string; isOnline: boolean }> {
    return new Observable((observer) => {
      this.socket.on('userStatusChanged', (data) => {
        observer.next(data);
      });
    });
  }

  disconnect() {
    this.socket.disconnect();
  }
}

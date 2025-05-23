import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

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

  // Poziva se nakon uspešnog login-a
  joinRoom(userId: string) {
    this.connect(); // pobrini se da je konektovan
    this.socket?.emit('joinRoom', userId);
  }

  // Sluša na ažuriranje dostupnih korisnika
  onAvailableListUpdated(): Observable<string[]> {
    return new Observable((observer) => {
      this.socket?.on('availableListUpdated', (users: string[]) => {
        observer.next(users);
      });
    });
  }

  // Sluša na promene statusa korisnika
  onUserStatusChanged(): Observable<{ userId: string; isOnline: boolean }> {
    return new Observable((observer) => {
      this.socket?.on('userStatusChanged', (data) => {
        observer.next(data);
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

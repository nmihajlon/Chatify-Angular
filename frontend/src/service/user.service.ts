import { inject, Injectable, signal } from '@angular/core';
import { User } from '../model/user.model';
import { USERS } from '../mocks/user.mock';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environtment/environment.develop';
import { SocketService } from './socket.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpClient = inject(HttpClient);
  private socketService = inject(SocketService);
  private authService = inject(AuthService);

  private _users = signal<User[]>([]);
  private _selectedUser = signal<User | null>(null);

  constructor() {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.socketService.onAvailableListUpdated().subscribe(() => {
          this.loadUsers();
        });
      }
    });

    this.loadUsers();
  }

  get users() {
    return this._users.asReadonly();
  }

  get selectedUser() {
    return this._selectedUser.asReadonly();
  }

  getUser(userId: string | null) {
    if (!userId) return null;
    return this._users().find(u => u._id === userId) ?? null;
  }

  loadUsers() {
    this.httpClient.get<User[]>(environment.apiUrl + 'available-users', {withCredentials: true}).subscribe({
      next: (response : any) => {
        this._users.set(response);
      },
      error: (err) => {
        console.error('Greška pri učitavanju korisnika:', err);
      }
    }); 
  }

  setSelectedUser(user: User | null) {
    this._selectedUser.set(user);
  }
}
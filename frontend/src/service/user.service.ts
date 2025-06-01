import { inject, Injectable, signal } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environtment/environment.develop';
import { tap } from 'rxjs';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpClient = inject(HttpClient);
  private chatService = inject(ChatService);

  private _users = signal<User[]>([]);
  private _selectedUser = signal<User | null>(null);

  get users() {
    return this._users.asReadonly();
  }

  // get selectedUser() {
  //   return this._selectedUser.asReadonly();
  // }

  getUser(users: User[], userId: string | null) {
    if (!userId) return null;
    return users.find(u => u._id === userId) ?? null;
  }

  loadUsers() {
    return this.httpClient.get<User[]>(environment.apiUrl + 'available-users', {withCredentials: true}).pipe(tap({
      next: (response : any) => {
        this._users.set(response);
      },
      error: (err) => {
        console.error('Greška pri učitavanju korisnika:', err);
      }
    })); 
  }

  // setSelectedUser(user: User | null) {
  //   this._selectedUser.set(user);
  // }
}
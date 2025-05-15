import { Injectable, signal } from '@angular/core';
import { User } from '../model/user.model';
import { USERS } from '../mocks/user.mock';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _users = signal<User[]>([]);
  private _selectedUser = signal<User | null>(null);

  get users() {
    return this._users.asReadonly();
  }

  get selectedUser() {
    return this._selectedUser.asReadonly();
  }

  loadUsers() {
    this._users.set(USERS);
  }

  setSelectedUser(user: User | null) {
    this._selectedUser.set(user);
  }
}
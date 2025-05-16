import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatInfoService {
  private _showChatInfo = signal<boolean>(false);

  get showChatInfo() {
    return this._showChatInfo.asReadonly();
  }

  toggleUserInfo() {
    this._showChatInfo.set(!this._showChatInfo());
  }

  setShowUserInfo(value: boolean) {
    this._showChatInfo.set(value);
  }
}

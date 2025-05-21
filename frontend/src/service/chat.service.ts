import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../environtment/environment.develop';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
    private httpClient = inject(HttpClient);
    
    addChat(){
        // this.httpClient.post(`${environment.apiUrl}`)
    }
}
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../environtment/environment.develop";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private httpClient = inject(HttpClient);

    login(user: any){
      return this.httpClient.post(environment.apiUrl+'auth/login', user);
    }

    register(newUser: any){
      return this.httpClient.post(environment.apiUrl+'auth/register', newUser);
    }
}

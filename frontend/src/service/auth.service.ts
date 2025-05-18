import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../environtment/environment.develop";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private httpClient = inject(HttpClient);

    register(newUser: any){
      console.log(newUser);
      return this.httpClient.post(environment.apiUrl+'auth/register', newUser);
    }
}

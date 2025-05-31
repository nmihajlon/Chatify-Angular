import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chatify';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.fetchCurrentUser().subscribe({
      next: user => console.log('User loaded on app start:', user),
      error: () => console.log('No user logged in on app start'),
    });
  }
}

import { Component } from '@angular/core';
import { User } from '../../../model/user.model';
import { AuthService } from '../../../service/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  imports: [RouterLink],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  user: User | null | undefined = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: (user) => {
        this.user = user;
      }
    });
  }

  triggerAvatarInput() {
    const input = document.getElementById('avatarInput') as HTMLInputElement;
    if (input) input.click();
  }

  onAvatarChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Pozovi servis za upload avatara ili prikaži preview
      // npr. this.userService.uploadAvatar(file)
    }
  }
}

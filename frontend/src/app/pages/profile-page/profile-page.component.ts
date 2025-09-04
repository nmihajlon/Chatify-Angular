import { Component, inject } from '@angular/core';
import { User } from '../../../model/user.model';
import { AuthService } from '../../../service/auth.service';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-profile-page',
  imports: [RouterLink],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  user: User | null | undefined = null;
  userService = inject(UserService);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: (user) => {
        this.user = user;
      }
    });
  }

  triggerAvatarInput(): void {
    const input = document.getElementById('avatarInput') as HTMLInputElement;
    if (input) {
      input.click();
    }
  }

  onAvatarChange(event: Event): void {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    const formData = new FormData();
    formData.append('avatar', file);

    this.userService.uploadAvatar(formData).subscribe({
      next: (response) => {
        if (this.user) {
          this.user.avatar = response.imageUrl;
        }
      }});
  }
}
}

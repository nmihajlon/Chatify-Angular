import { Component, DestroyRef, inject } from '@angular/core';
import { AvatarComponent } from "../shared/avatar/avatar.component";
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../model/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  imports: [AvatarComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private userSub?: Subscription;

  loggedUser!: User | null | undefined;

  ngOnInit() {
    this.userSub = this.authService.currentUser$.subscribe({
      next: (user) => {
        this.loggedUser = user;
      }
    });

    this.destroyRef.onDestroy(() => {
      this.userSub?.unsubscribe();
    });
  }

  logout() {
    this.userSub?.unsubscribe();
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      }
    });
  }
}
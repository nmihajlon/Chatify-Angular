import { Component, inject } from '@angular/core';
import { AvatarComponent } from "../shared/avatar/avatar.component";
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../model/user.model';

@Component({
  selector: 'app-sidenav',
  imports: [AvatarComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  loggedUser! : User;

  ngOnInit(){
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.loggedUser = user;
      }
    })
  }

  logout(){
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      }
    });
  }
}

import { Component, computed, inject, signal } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { BreakpointObserver,Breakpoints  } from '@angular/cdk/layout';
import { EmptyScreenComponent } from '../../components/empty-screen/empty-screen.component';
import { SidenavComponent } from "../../components/sidenav/sidenav.component";
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-home-page',
  imports: [SidebarComponent, RouterOutlet, EmptyScreenComponent, SidenavComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private activatedRouter = inject(ActivatedRoute);
  private breakPointObserver = inject(BreakpointObserver);
  selectedUser = this.userService.selectedUser;
  isMdScreen = signal(false);
  isLgScreen = signal(false);

  ngOnInit() {

    this.authService.currentUser$.subscribe({
      next: user => {
        if(user === null){
          this.authService.getCurrentUser().subscribe({});
        }
      }
    });
    
    this.userService.loadUsers();
  
    this.breakPointObserver.observe(['(max-width: 1023.98px)']).subscribe(result => {
      this.isMdScreen.set(result.matches);
    });

    this.breakPointObserver.observe('(min-width: 1024px)').subscribe(result => {
      this.isLgScreen.set(result.matches);
    });

    const childRoute = this.activatedRouter.firstChild;
    const userId = childRoute?.snapshot.paramMap.get('userId') ?? null;
    const user = this.userService.getUser(userId);
    this.userService.setSelectedUser(user);
  }

}

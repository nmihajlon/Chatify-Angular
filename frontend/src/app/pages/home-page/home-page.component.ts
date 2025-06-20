import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { EmptyScreenComponent } from '../../components/empty-screen/empty-screen.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { AuthService } from '../../../service/auth.service';
import { SocketService } from '../../../service/socket.service';
import { filter, Subject, takeUntil } from 'rxjs';
import { ChatService } from '../../../service/chat.service';
import { Chat } from '../../../model/chat.model';

@Component({
  selector: 'app-home-page',
  imports: [
    SidebarComponent,
    RouterOutlet,
    EmptyScreenComponent,
    SidenavComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private chatService = inject(ChatService);
  private activatedRouter = inject(ActivatedRoute);
  private breakPointObserver = inject(BreakpointObserver);
  private destroyRef = inject(DestroyRef);
  private socketService = inject(SocketService);
  private destroy$ = new Subject<void>();

  selectedChat = this.chatService.getSelectedChat;
  isMdScreen = signal(false);
  isLgScreen = signal(false);

  ngOnInit() {

    this.authService.currentUser$
      .pipe(
        takeUntil(this.destroy$),
        filter((user) => !!user)
      )
      .subscribe((user) => {
        this.socketService.joinRoom(user._id);

        // Socket listeners
        this.socketService
          .onAvailableListUpdated()
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.userService.loadUsers().subscribe();
          });
      });

    // Load korisnika
    this.userService.loadUsers().subscribe();
    
    // Breakpoint observer
    this.breakPointObserver
      .observe(['(max-width: 1023.98px)'])
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.isMdScreen.set(result.matches);
      });

    this.breakPointObserver
      .observe('(min-width: 1024px)')
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.isLgScreen.set(result.matches);
      });

    // Cleanup
    this.destroyRef.onDestroy(() => {
      this.destroy$.next();
      this.destroy$.complete();
    });
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
}

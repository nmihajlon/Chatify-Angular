import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { LoginRegisterPageComponent } from './pages/login-register-page/login-register-page.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: LoginRegisterPageComponent,
    },
    {
        path: 'chat',
        component: HomePageComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path:':userId',
                component: ChatPageComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: 'login',
        component: LoginRegisterPageComponent
    },
    {
        path: '**',
        component: HomePageComponent
    }
];

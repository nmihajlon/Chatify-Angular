import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { LoginRegisterPageComponent } from './pages/login-register-page/login-register-page.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginRegisterPageComponent,
    },
    {
        path: 'chat',
        component: HomePageComponent,
        children: [
            {
                path:':userId',
                component: ChatPageComponent       
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
